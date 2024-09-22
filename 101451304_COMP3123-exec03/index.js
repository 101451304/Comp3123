var http = require("http");
const employeeModule = require("./employee"); 
console.log("Lab 03 - NodeJs");

const port = process.env.PORT || 8081;

const server = http.createServer((req, res) => {
    
    res.setHeader("Content-Type", "application/json");

   
    if (req.method !== 'GET') {
        res.statusCode = 405; 
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
    } else {
        if (req.url === '/') {
            
            res.setHeader("Content-Type", "text/html");  
            res.end("<h1>Welcome to Lab Exercise 03</h1>");
        } else if (req.url === '/employee') {
            
            res.end(JSON.stringify(employeeModule.getAllEmployees()));
        } else if (req.url === '/employee/names') {
            
            res.end(JSON.stringify(employeeModule.getEmployeeNames()));
        } else if (req.url === '/employee/totalsalary') {
            
            res.end(JSON.stringify({ total_salary: employeeModule.getTotalSalary() }));
        } else {
            
            res.statusCode = 404; 
            res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
        }
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
