const fs = require('fs');

module.exports = {
    addPlayerPage: (req, res) => {
        res.render('add-record.ejs', {
            title: 'Welcome to Salon | Add a new record'
            , message: ''
        });
    },
    addPlayer: (req, res) => {

        var price = 0;
        let message = '';
        let room_number = req.body.room_number;
        let customer_id = req.body.customer_id;
        let record_date = req.body.record_date;
        let review = req.body.review;
        let is_record = req.body.is_record;
        let service_id = req.body.service_id;
        let record_id = req.body.record_id;
        let employee_id = req.body.employee_id;
        let date_and_time = req.body.date_and_time;
        let firstname = req.body.firstname;

        console.log(req);

        let recordQuery = "SELECT * FROM Beauty.Record INNER JOIN Beauty.SpecialistRecord ON Beauty.Record.record_id = Beauty.SpecialistRecord.record_id WHERE record_date = '" + record_date + "' AND (employee_id=" + employee_id + " OR room_number=" + room_number + ")";
        let priceQuery = "select SUM(Service.price) from ServiceRecord inner join Record On ServiceRecord.service_id = Service.service_id;"



        db.query(priceQuery, (err, price) => {
            if (err) {
                return res.status(500).send('Time is filled in');
            }
            if (price.length > 0) {
                
                db.query(recordQuery, (err, res) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    let query = "INSERT INTO Beauty.Record (record_id, room_number, customer_id, price, record_date, review, is_record) VALUES (default" +
                    room_number+ ", " + customer_id + ", " + p + ", " + price + ", '" + record_date + "', '" + review + "', true);"+
                    "INSERT INTO SpecialistRecord VALUES("+employee_id+","+record_id+");"+
                    "INSERT INTO ServiceRecor VALUES("+service_id+","+record_id+");";
                    db.query(query, (err, result)=>{
                        if (err) {
                            return res.status(500).send(err);
                        }
                    });
                });
            } else {

                message = 'No such service available';
                res.render('add-record.ejs', {
                    message,
                    title: 'Welcome to Salon | Add a new record'
                });
            }
            res.redirect('/');
        });
    },
};