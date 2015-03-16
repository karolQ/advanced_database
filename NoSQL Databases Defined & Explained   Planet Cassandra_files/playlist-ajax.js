var hst = 'http://planetcassandra.org';
$(document).ready( function() {
    /*$("#playlist").change(function() {
        var plId = $( "#playlist" ).val();
        var vcId = $( "#video_company" ).val();
    
        $.ajax({
           type : "post",
           dataType : "",
           url : Pl_Ajax.playajaxurl,
           data : {action: "load_specific_playlist", pl_id : plId, co_id: vcId},
           success : function (response) {
           console.log(response);
           $("#video_main").html(response);
           }
        });
    });*/
    
    //$("#playlist").trigger( "change" );
});

/**
 * An Ajax request to fetch and display the company list in dropdown.
 */
function load_company_selbox(pl_ele) {
    $( "#video_company" ).val('all');
    var plVal = $( "#playlist" ).val();
    $.ajax({
       type : "post",
       dataType : "",
       url : Pl_Ajax.playajaxurl,
       data : {action: "load_playlist_companies", pl_val : plVal },
       success : function (response) {
        console.log(response);
        $("#company_dd").html(response);
       }
    });
    
    load_videos();
}

/**
 * To load videos after playlist and company selection
 */
function load_videos() {
    //alert(ele.value)
    var plVal = $( "#playlist" ).val();
    var vcVal = $( "#video_company" ).val();
    //alert(plVal+" "+vcVal);
    if(vcVal == '' || vcVal == 'undefined' || vcVal == null) {
        window.location = hst+"/video-presentations/vp/"+plVal;
    } else {
        window.location = hst+"/video-presentations/vp/"+plVal+"/company/"+vcVal;
    }
}