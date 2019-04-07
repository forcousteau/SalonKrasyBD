const fs = require('fs');

module.exports = {
    addEmployeePage: (req, res) => {
        res.render('add-employee.ejs', {
            title: 'Welcome to Salon' | 'Team' | 'Add a new service'
            ,message: ''
        });
    },
    addEmployee: (req, res) => {
        //employee_id first_name surname patronymic phone_num experience is_specialist
        let message = '';
        let employeeID = req.body.employee_id;
        let first_name = req.body.first_name;
        let surname = req.body.surname;
        let patronymic = req.body.patronymic;
        let password = req.body.password;
        let phone_num = req.body.phone_num;
        let experience = req.body.experience;
        let salary = req.body.salary;
        let is_specialist = req.body.is_specialist;
        //console.log(req);

        let service_nameQuery = "SELECT * FROM Beauty.Specialist WHERE employee_id = '" + employeeID + "'";

        db.query(service_nameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if(is_specialist){

                //(employee_id,first_name,surname,patronymic,password,phone_num,experience,salary);
                let query = "INSERT INTO Beauty.Specialist values(default, '"+first_name+"','"+surname+"','"+patronymic+"','"+password+"','"+phone_num+"',"+experience+",default, true);";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            }else{
                let query = "INSERT INTO Beauty.Manager values(default, '"+first_name+"','"+surname+"','"+patronymic+"','"+password+"','"+phone_num+"',"+experience+","+salary+");";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            }
            
        });
    },
    editEmployeePage: (req, res) => {
        let message = '';
        let employeeID = req.params.employee_id;
        let query;
        if(employeeID > 1999)
         query = "SELECT * FROM Beauty.Specialist WHERE employee_id = '" + employeeID + "' ";
        else
         query = "SELECT * FROM Beauty.Manager WHERE employee_id = '" + employeeID + "' ";        
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-employee.ejs', {
                title: 'Edit  Employee'
                ,employee: result[0]
                ,message: ''
            });
        });
    },
    editEmployee: (req, res) => {
        let employeeID = req.params.service_id;
        let first_name = req.body.first_name;
        let surname = req.body.surname;
        let patronymic = req.body.patronymic;
        let password = req.body.password;
        let phone_num = req.body.phone_num;
        let experience = req.body.experience;
        let salary = req.body.salary;
        let is_specialist = req.body.is_specialist;

        var query;
        if(is_specialist)
        query = "UPDATE Beauty.Specialist SET `first_name` = '" + first_name + "', `surname` = '" + surname + "', `patronymic` = '" + patronymic + "', password='"+password+ "', phone_num='"+phone_num+ "', experience="+experience+ ", salary="+salary+" WHERE employee_id="+employeeID;
        else
        query = "UPDATE Beauty.Manager SET `first_name` = '" + first_name + "', `surname` = '" + surname + "', `patronymic` = '" + patronymic + "', password='"+password+ "', phone_num='"+phone_num+ "', experience="+experience+ ", salary="+salary+" WHERE employee_id="+employeeID;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteEmployee: (req, res) => {
        let employeeId = req.params.employee_id;
        var deleteEmployeeQuery;
        if(employeeId > 1999)
         deleteEmployeeQuery = 'DELETE FROM Beauty.Specialist WHERE employee_id = "' + employeeId + '"';
        else
         deleteEmployeeQuery = 'DELETE FROM Beauty.Specialist WHERE employee_id = "' + employeeId + '"';
        db.query(deleteEmployeeQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};