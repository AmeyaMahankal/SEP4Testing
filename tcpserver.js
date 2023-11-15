const net = require("net");
const mongoose = require('mongoose')
const axios = require("axios");
const mongoString = process.env.DATABASE_URL

const server = net.createServer((socket) => {
    console.log("someone connected :3");

    socket.on("data", async (data) => {
        console.log(`Received from client: ${data.toString()}`);
        //01362410
        //Temp = 24.10
        //humidity = 36%

        receivedData = data.toString();

        const temperature = parseInt(receivedData.substring(4, 6));

        console.log(temperature);

        const endpointurl = ""

        try {
            const response = await axios.post("http://localhost:3000/api/post", {
                "name": "plswork",
                "age": temperature
            });

            console.log("Data sent to the endpoint:", response.data);
        } catch (error) {
            console.error("Error sending data to the endpoint:", error);
        }


    });

    socket.on("end", () => {
        console.log("Client disconnected");
    });

    server.on("error", (err) => {
        console.error("Server error ,", err);
    })


});

const host = "192.168.90.98"; //ip
const port = 23; //port

server.listen(port, host, () => {
    console.log(`Server is listening on ${host}:${port}`);
});


