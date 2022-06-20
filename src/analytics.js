import * as $ from "jquery"


function createAnalytics() {
    let counter = 0;
    let destroyed = false;

    const listener = () => counter++;

    $(document).off('click', listener)

    return {
        destroy() {
            $(document).on('click', listener)
            destroyed = true;
        },
        getClicks() {
            if (destroyed) {
                return `"Analytics is destroyed. Total clicks = ${counter}"`
            }
            return counter;
        }
    }
}
window.analytics = createAnalytics();