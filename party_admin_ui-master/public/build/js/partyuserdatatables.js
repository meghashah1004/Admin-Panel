 var  editor;
$(function(){


var party_user_table=$("#datatable-party_user").DataTable({
    //loadUserDetails.do
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": true,
    "orderable": true,
     "order": [[ 0, "desc" ]],
    "targets": 0 ,
    "info": true,
    "autoWidth": true,
    dom: "Blfrtip",
    buttons: [
	{
        extend: "copy",
		className: "btn-sm"
    },
	{
        extend: "csv",
		className: "btn-sm"
    },
	{
        extend: "excel",
		className: "btn-sm"
    },
	{
        extend: "pdfHtml5",
		className: "btn-sm"
    },
	{
        extend: "print",
		className: "btn-sm"
    },
	],
    responsive: true,
        select: {
            style: 'os',
            items: 'row'
    },
   
    ajax: {
        url: "http://localhost:9123/getusers",
        dataSrc: "rows"
    },    
    "columns": [
        {
        "title": "S.No",
        "data": "id",
         "orderable": false,
        "targets": 0 
        },
        {
        "title": "Name",
        "data": "name"
        },
        {
        "title": "Email",
        "data": "email"
        },
        {
        "title": "Phone No",
        "data": "phone_no"
        },
        {
        "title": "Status",
        "data": "status",
        "defaultContent": "<span class='label label-primary'></span>",
        },
        {
        "title": "Subscribed",
        "data": "subscription",
        "defaultContent": "<span class='label label-primary'></span>",
        "render": function ( data, type, row, meta ) {
            if(data)
                     return 'Yes';
            else 
                     return 'No';
            }   
        },
        {
        "title": "Created At",
        "data": "created_at",
//         "class":"none"
        },
        {
         "defaultContent": "<button type='button' class='btn btn-primary  btn-sm'><span class='glyphicon glyphicon-edit' ></span></button>",
         "data": null,
         "class":"all"
        }
    ],
    "rowCallback": function(row, data){
    if(data.status==1){
        
        $('td:eq(4)', row).html("<label class='label label-lg label-success'>Active</label>" );
        $('td:eq(4)', row).css("font-size", "16px");
    }
    else if(data.status==0){
        
        $('td:eq(4)', row).html("<label class='label label-lg label-warning'>Not Verified</label>" );
        $('td:eq(4)', row).css("font-size", "18px");
//        $('td:eq(4)', row).css("color", "red");
    }else if(data.status==-1){
        
        $('td:eq(4)', row).html("<label class='label label-lg label-danger'>Blocked</label>" );
        $('td:eq(4)', row).css("font-size", "16px");
//        $('td:eq(4)', row).css("color", "red");
    }
    }
}
);
 var current_row;
    $('#datatable-party_user tbody').on( 'click', 'button', function () {
 current_row = $(this).parents('tr');//Get the current row
    if (current_row.hasClass('child')) {//Check if the current row is a child row
        current_row = current_row.prev();//If it is, then point to the row before it (its 'parent')
    }
        var data = party_user_table.row(current_row).data();
    //At this point, current_row refers to a valid row in the table, whether is a child row (collapsed by the DataTable's responsiveness) or a 'normal' row
      var statusStr=0;  
        if(data.status==1){
            statusStr=0;
        }else if(data.status==0){
            statusStr=1;
        }else if(data.status==-1){
            statusStr=2;
        }
    console.log('Row data:'+data);

        $('#edit_id').text(data.id);
        $('#edit_name').text(data.name);
        $('#edit_email').text(data.email);
        $('#edit_phone_no').text(data.phone_no);
        $('#edit_created_At').text(data.created_at);
        $('#edit_status').prop('selectedIndex', statusStr);        $('#edit_subscribed').prop( "checked",data.subscription);
        $('#edit_record_modal').modal("show");
    } );
    
    $('#submit_modal').on( 'click', function () {
       
        console.log("saving data");
        var id= $('#edit_id').text();
        var name= $('#edit_name').text();
        var email= $('#edit_email').text();
        var phone_no= $('#edit_phone_no').text();
        var status= $('#edit_status').val();
        var subscribed=$('#edit_subscribed').prop('checked');
        console.log("checked: "+$('#edit_subscribed').prop('checked'));
        var created_at= $('#edit_created_At').text();
        id=parseInt(id);
        status=parseInt(status);
        var json_obj={
            id : id,
            name :name,
            email:email,
            phone_no :phone_no,
            status :status,
            subscription: subscribed,
            created_at:created_at
            };
         console.log("sending to database: "+JSON.stringify(json_obj));
        
        $.ajax({
	        type:'POST',
//	        url:"http://localhost:4000/updateusers",
	        url:"http://localhost:9123/modifyusers",
	        dataType:"json",
	        data: json_obj,
	        success:function (json) {
                
                 party_user_table.ajax.reload(null,false);
                $('#edit_status_modal').modal("hide");
	            var responseJson = JSON.stringify(json);
	            console.log("Success => "+responseJson);
	            console.log("----------------END--------------------");
	        },
	        error: function (json) {
	            console.log("Failed");
	            var parsedJson = json;
	            console.log("Failed==>"+parsedJson);
	        }
		});
         party_user_table.row(current_row).data(json_obj).draw();

       $('#edit_record_modal').modal("hide");
            $('#edit_status_modal').modal("show");

    } );
  
});
function isNumber(no) {
 var regex = /[0-9]{1,}/;
return regex.test(no);
}
