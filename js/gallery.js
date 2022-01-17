

load_photos_from_year(year){
	var dir = "../css/pictures/" + year + "/";
	var fileextension1 = ".jpg";
	$.ajax({
	    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
	    url: dir,
	    success: function (data) {
	        //List all .png file names in the page
	        $(data).find("a:contains(" + fileextension + ")").each(function () {
	            var filename = this.href.replace(window.location.host, "").replace("http://", "");
	            $(".bottom-container").append("<img src='" + dir + filename + "'>");
	        });
	    }
	});
};
