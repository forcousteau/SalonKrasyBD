module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM Beauty.Service"; // query database to get all the services

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: 'Welcome to Salon' | 'Team' | 'View Services',
                services: result
            });
        });
    },
    getTeamPage: (req, res) =>{
        let query = "SELECT employee_id,first_name,surname,patronymic,password,phone_num,experience,salary FROM Specialist UNION SELECT employee_id,first_name,surname,patronymic,password,phone_num,experience,salary FROM Manager;";
        let query1 = "SELECT * FROM Beauty.Manager";
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('team.ejs', {
                title: 'Welcome to Salon' | 'Team' | 'View Services',
                employees: result
            });
        });
    },
};
