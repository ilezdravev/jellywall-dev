jQuery(window).load(function () {
    var isSettingsObj = JSON.parse(isSettings);
    if($(isSettingsObj.path).length > 0){
        let path = $(isSettingsObj.path).attr('href').replace(/\d+/,'{{#}}');
        var infScroll = $(isSettingsObj.container).infiniteScroll({
            path: path,
            append: isSettingsObj.append,
            history: false,
            hideNav: isSettingsObj.hideNav,
            status: isSettingsObj.status
        });
    }
});