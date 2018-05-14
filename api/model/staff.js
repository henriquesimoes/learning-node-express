'use strict';

const Database = require('../lib/database');

class Staff {
    constructor(staff) {
        if(staff !== undefined){
            this.id = staff._id;
            if(staff.id !== undefined){
                this.id = staff.id;
            }
            this.name = staff.name;
            this.email = staff.email;
            this.phone = staff.phone;
            this.updateSalary(parseFloat(staff.salary));
        }
    }

    get insertFormat(){
        return {
            name: this.name,
            phone: this.phone,
            email: this.email,
            salary: this.salary
        };
    }
    
    get updateFormat(){
        let staff = {};
        if(this.name !== undefined){
            staff.name = this.name;
        }
        if(this.email !== undefined){
            staff.email = this.email;
        }
        if(this.phone !== undefined){
            staff.phone = this.phone;
        }
        if(this.salary !== undefined){
            staff.salary = this.salary;
        }
        return staff;
    }

    get objectId(){
        return Database.createObjectID(this.id);
    }
    
    updateSalary(salary){
        this.salary = (salary < 0)? 0 : salary;
    }
}

module.exports = Staff;