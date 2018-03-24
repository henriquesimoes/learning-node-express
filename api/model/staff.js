'use strict';

class Staff {
    constructor(staff) {
        if(staff !== undefined){
            this._id = parseInt(staff._id);
            this.name = staff.name;
            this.email = staff.email;
            this.phone = staff.phone;
            this.updateSalary(parseFloat(staff.salary));
        }
    }
    
    updateSalary(salary){
        this.salary = (salary < 0)? 0 : salary;
    }
}

module.exports = Staff;