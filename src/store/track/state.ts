import axiosService from "../../services/axios/axiosService";
import qs from "qs";

const baseUrl = process.env.NODE_ENV === "production" ? "https://client..com/" : "https://clientdev..com/";

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

const trackData = {
    multiOrder: false,
    showMultiOrder: false,
    showTrack: false,
    // showTerms: true,
    showNotFound: false,
    status: "",
    originDate: "",
    originLocation: "",
    destinationDate: "",
    destinationLocation: "",
    orders: [],
    pro: "",
    ref: "",
    deliveryDate: "",
    pallet: "",
    details: {}
};

function getStage(key: number) {
    for (let i = 0; i < stageArray.length; i++) {
        if (stageArray[i].key == key) {
            return stageArray[i].value;
        }
    }
}


const searchByProNumber = async (proNumber: number) => {
    const res = await axiosService.post("write/get_pro_history.php", qs.stringify({ pro: proNumber })).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.log(error);
    });
    return res;
};

const track = {
    trackData,
    searchByProNumber
};

export default track;
