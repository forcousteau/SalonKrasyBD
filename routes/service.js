const fs = require('fs');

module.exports = {
    addServicePage: (req, res) => {
        res.render('add-service.ejs', {
            title: 'Welcome to Salon' | 'Add a new service'
            ,message: ''
        });
    },
    addService: (req, res) => {
        
        let message = '';
        let price = req.body.price;
        let service_name = req.body.service_name;
        let time_amount = req.body.time_amount;
        console.log(req);

        let service_nameQuery = "SELECT * FROM Beauty.Service WHERE service_name = '" + service_name + "'";

        console.log(service_nameQuery)
        db.query(service_nameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Service already exists';
                res.render('add-service.ejs', {
                    message,
                    title: 'Welcome to Salon' | 'Add a new service'
                });
            } else {
                        // send the services details to the database
                        let query = "INSERT INTO Beauty.Service VALUES (default, " +
                            price + ", '" + service_name + "', '" + time_amount + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
 

                }
            
        });
    },
    editServicePage: (req, res) => {
        let serviceId = req.params.service_id;
        let query = "SELECT * FROM Beauty.Service WHERE service_id = '" + serviceId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-service.ejs', {
                title: 'Edit  Service'
                ,service: result[0]
                ,message: ''
            });
        });
    },
    editService: (req, res) => {
        let serviceId = req.params.service_id;
        let price = req.body.price;
        let service_name = req.body.service_name;
        let time_amount = req.body.time_amount;

        let query = "UPDATE Beauty.Service SET `price` = '" + price + "', `service_name` = '" + service_name + "', `time_amount` = '" + time_amount + "' WHERE service_id ="+serviceId;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteService: (req, res) => {
        let serviceId = req.params.service_id;
        let deleteServiceQuery = 'DELETE FROM Beauty.Service WHERE service_id = "' + serviceId + '"';
        db.query(deleteServiceQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};