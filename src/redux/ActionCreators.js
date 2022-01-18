import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addStaff = (staff) => ({
    type: ActionTypes.ADD_STAFF,
    payload: staff
})

export const postStaff = (name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => (dispatch) => {
    dispatch(staffsLoading(true));
    const newStaff = {
        name: name,
        doB: doB,
        startDate: startDate,
        departmentId: departmentId,
        salaryScale: salaryScale,
        annualLeave: annualLeave,
        overTime: overTime,
    }
    newStaff.image = "/asset/images/alberto.png"; 

    return fetch(baseUrl + 'staffs', {
        method: 'POST',
        body: JSON.stringify(newStaff),
        headers: {
            'Content-Type': 'application/json'
        }, 
        credentials: 'same-origin',
    })
        .then(response => {
                if(response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.message);
                    error.response = response;
                    throw error;
                }
            }, 
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(staff => dispatch(addStaff(staff)))
            .then(() => dispatch(fetchStaffsSalary()))
            .then(() => dispatch(fetchDepartments()))
            .catch(error => dispatch(staffsFailed(error.message)))
}

export const onDelete = (staffId) => (dispatch) => {
    return fetch(baseUrl + 'staffs/' + staffId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            }
        })
        .then(response => {
                if(response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.message);
                    error.response = response;
                    throw error;
                }
            }, 
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(staffs => dispatch(addStaffs(staffs)))
            .then(() => dispatch(fetchStaffsSalary()))
            .then(() => dispatch(fetchDepartments()))
            .catch(error => dispatch(staffsFailed(error.message)))
};

export const changeInfo = (staffId, name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) => (dispatch) => {
    // dispatch(staffsLoading(true));
    console.log(staffId, name, doB)
    const staffChanged = {
        name: name,
        doB: doB,
        startDate: startDate,
        departmentId: departmentId,
        salaryScale: salaryScale,
        annualLeave: annualLeave,
        overTime: overTime,
    }
    staffChanged.image = "/asset/images/alberto.png"; 
    console.log(staffChanged)
    return fetch(baseUrl + 'staffs', {
        method: 'PUT',
        body: JSON.stringify(staffChanged),
        headers: {
            'Content-Type': 'application/json'
        }, 
    })
        .then(response => {
                if(response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.message);
                    error.response = response;
                    throw error;
                }
            }, 
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
            )
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => dispatch(staffsFailed(error.message)))
};


export const fetchStaffs = () => (dispatch) => {
    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'staffs')
        .then(response =>{
                if(response.ok) {
                    return response;
                }
                else{
                    var error = new Error('Error ' + response.status + ': ' + response.message);
                    error.response = response;
                    throw error;
                };
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then((response => response.json()))
        .then(staffs => dispatch(addStaffs(staffs)))
        .catch(error => dispatch(staffsFailed(error.message)));
};


export const addStaffs = (staffs) =>({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
}); 

export const delStaff = (staff) => ({
    type: ActionTypes.DELETE_STAFF,
    payload: staff
})

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING,
});

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
});


//////////////////////////////////////////////////////////////////
export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'departments')
        .then(response =>{
                if(response.ok) {
                    return response;
                }
                else{
                    var error = new Error('Error ' + response.status + ': ' + response.message);
                    error.response = response;
                    throw error;
                };
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then((response => response.json()))
        .then(departments => dispatch(addDepartments(departments)))
        .catch(error => dispatch(departmentsFailed(error.message)));
};

export const addDepartments = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments
});

export const departmentsLoading = () => ({
    type: ActionTypes.DEPARTMENTS_LOADING,
});

export const departmentsFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess
});

////////////////////////////////////////////////////////
export const fetchStaffsSalary = () => (dispatch) => {
    dispatch(staffsSalaryLoading(true));

    return fetch(baseUrl + 'staffsSalary')
        .then(response =>{
                if(response.ok) {
                    return response;
                }
                else{
                    var error = new Error('Error ' + response.status + ': ' + response.message);
                    error.response = response;
                    throw error;
                };
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then((response => response.json()))
        .then(staffsSalary => dispatch(addStaffsSalary(staffsSalary)))
        .catch(error => dispatch(staffsSalaryFailed(error.message)));
};

export const addStaffsSalary = (staffsSalary) => ({
    type: ActionTypes.ADD_STAFFSSALARY,
    payload: staffsSalary
});

export const staffsSalaryLoading = () => ({
    type: ActionTypes.STAFFSSALARY_LOADING,
});

export const staffsSalaryFailed = (errmess) => ({
    type: ActionTypes.STAFFSSALARY_FAILED,
    payload: errmess
});