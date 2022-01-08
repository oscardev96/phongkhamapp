const baseUrl = "http://localhost:9001"

export const urlApi =  {
    GET_LIST_DRUG : baseUrl + "/drug",
    DELETE_DRG : baseUrl + "/drug/delete",
    ADD_DRUG : baseUrl + "/drug/addDrug",
    EDIT_DRUG : baseUrl + "/drug/updateDrug",
    GET_DOCTOR : baseUrl + "/doctor",

    GET_LIST_APPOINTMENT  : baseUrl + "/appointment",
    CREATE_APPOINTMENT : baseUrl + "/appointment/create",
    GET_APPOINTMENT : baseUrl + "/appointment/detailAppointment"

}

