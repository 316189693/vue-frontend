import axios from "axios";
import qs from "qs";

const baseUrl = process.env.NODE_ENV === "production" ? "https://client.freightapp.com/" : "https://clientdev.freightapp.com/";

const stageArray = [
    {
        key: -1,
        value: "Cancelled"
    },
    {
        key: -2,
        value: "Quote"
    },
    {
        key: -3,
        value: "Load Building"
    },
    {
        key: 0,
        value: "Pickup"
    },
    {
        key: 2,
        value: "Linehaul"
    },
    {
        key: 3,
        value: "Delivery"
    },
    {
        key: 4,
        value: "Delivery"
    },
    {
        key: 5,
        value: "Delivery"
    },
    {
        key: 6,
        value: "Complete"
    },
    {
        key: 7,
        value: "Self Storage/Mini Storage"
    },
    {
        key: 8,
        value: "Religious Institution"
    },
    {
        key: 100,
        value: "Inspection"
    },
    {
        key: 101,
        value: "Trailer"
    },
    {
        key: 777,
        value: "Drayage"
    },
];

function getStage(key: number) {
    for (let i = 0; i < stageArray.length; i++) {
        if (stageArray[i].key == key) {
            return stageArray[i].value;
        }
    }
}


const getOrdersCustomer = async (userID: number) => {
    const res = await axios.post(baseUrl + "write/get_tms_orders_customer.php", qs.stringify({ userID: userID }), { headers: { "Content-Type": "application/x-www-form-urlencoded"} })
        .then(response => response.data)
        .then(data => {
            return data;
        })
        .catch(function (error) {
            // alert(error);
        });
    return res;
};

const home = {
    getStage,
    getOrdersCustomer
};

export default home;