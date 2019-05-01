const PerformanceService = {

    INIT_START : 'initStart',
    INIT_END : 'initEnd',
    GET_URN_START : 'getUrnStart',
    GET_URN_END : 'getUrnEnd',

    getmark() {
        return window.performance.getEntriesByType("mark");
    },

    getMeasurements(name, mark1, mark2){
        return window.performance.getEntriesByType("measure")
    },

    setMeasurement(name, mark1, mark2){
        window.performance.measure(name, mark1, mark2);
    },

    setmark(mark) {
        window.performance.mark(mark);
    }
};
export default  PerformanceService;
