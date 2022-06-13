/**
 * Get fetchDataTableRecords
  @param {} dtReq
  @param {} MODEL
  @param {} fieldNames
  @param {} conditionQuery
  @param {} projectionQuery
  @param {} sortingQuery
  @param {} populateQuery
  @param {} callback
*/

exports.fetchDataTableRecords = async (dtReq, MODEL, fieldNames, conditionQuery, projectionQuery, sortingQuery, callback) => {
    try {
        const searchQuery = conditionQuery;
        const drawRecord = (dtReq?.draw) || 1;
        const skipRecord = (dtReq?.start) || 0;
        const limitRecord = (dtReq.length) || 10;

        if (dtReq.search && dtReq.search.value != '' && fieldNames.length > 0) {
            const regex = new RegExp(dtReq.search.value, "i");
            const orQueryList = [];
            for (let i = 0; i < fieldNames.length; i++) {
                const searchJson = {};
                searchJson[fieldNames[i]] = regex;
                orQueryList.push(searchJson);
            }
            searchQuery.$or = orQueryList;
        }

        const responseJson = {
            "draw": drawRecord,
            "recordsFiltered": 0,
            "recordsTotal": 0,
            "data": []
        };

        const totalRecordsCount = await MODEL.countDocuments(conditionQuery);
        responseJson.recordsTotal = totalRecordsCount;

        let recordsData;
        const recordsFilteredCount = await MODEL.countDocuments(searchQuery);
        responseJson.recordsFiltered = recordsFilteredCount;

        recordsData = await MODEL.find(searchQuery, projectionQuery, { skip: Number(skipRecord), limit: Number(limitRecord), sort: sortingQuery });

        if (recordsData) {
            responseJson.data = recordsData;
            callback(null, responseJson);
        } else {
            let err = new Error(`Error: No record found with query: ${searchQuery}`);
            callback(err, null);
        }
    } catch (err) {
        return callback(err, null);
    }

}