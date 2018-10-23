 var  editor;
$(function(){

var party_promo_table=$("#datatable-promo").DataTable({
    //loadUserDetails.do
    
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": true,
    "orderable": true,
     "order": [[ 0, "desc" ]],
    "targets": 0 ,
    "info": true,
    "filter":true,
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
        url: "http://localhost:9123/getpromos",
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
        "title": "User Name",
        "data": "name"
        },
        {
        "title": "Phone No",
        "data": "phone_no"
        },
        
        {
        "title": "PromoCode",
        "data": "promo_code"
        },
        {
        "title": "Promo Percentage",
        "data": "promo_percentage"
        },
        {
        "title": "Promo Category",
        "data": "promo_category"
        },
        {
        "title": "Status",
        "data": "status",
        "render": function ( data, type, row, meta ) {
            if(data==1)
                     return 'Active';
            else  if(data==-1)
                     return 'Invalid';
            return 'Undefined';
            },
        "defaultContent": "<span class='label label-primary'></span>",
        },
        {
        "title": "Created At",
        "data": "created_at",
//            "class":"none"
        },
        {
         "defaultContent": "<button type='button' class='btn btn-primary  btn-sm'><span class='glyphicon glyphicon-edit' ></span></button>",
         "data": null,
             "class":"all"
        }
    ],
    "rowCallback": function(row, data){
    if(data.status==1){
        
        $('td:eq(6)', row).html("<label class='label label-lg label-success'>Active</label>" );
        $('td:eq(6)', row).css("font-size", "16px");
    }
   else if(data.status==-1){
        
        $('td:eq(6)', row).html("<label class='label label-lg label-danger'>Invalid</label>" );
        $('td:eq(6)', row).css("font-size", "16px");
    }
    }
}
);//paty promo data table end

     var current_row;
    $('#datatable-promo tbody').on( 'click', 'button', function () {
    current_row = $(this).parents('tr');//Get the current row
    if (current_row.hasClass('child')) {//Check if the current row is a child row
        current_row = current_row.prev();//If it is, then point to the row before it (its 'parent')
    }
        var data = party_promo_table.row(current_row).data();
    //At this point, current_row refers to a valid row in the table, whether is a child row (collapsed by the DataTable's responsiveness) or a 'normal' row
    
    console.log('Row data:'+data);

        $('#edit_id').text(data.id);
        $('#edit_name').text(data.name);
        $('#edit_phone_no').text(data.phone_no);
        $('#edit_promo_code').val(data.promo_code);
        $('#edit_promo_percentage').val(data.promo_percentage);
        $('#edit_promo_category').val(data.promo_category);
        $('#edit_created_At').text(data.created_at);
        $('#edit_status').val(data.status);     
        $('#edit_record_modal').modal("show");
    } );
    
    $('#submit_modal').on( 'click', function () {
       
        console.log("saving data");
        var id= $('#edit_id').text();
        var name= $('#edit_name').text();
        var phone_no= $('#edit_phone_no').text();
        var promo_code=$('#edit_promo_code').val();
        var promo_percentage=$('#edit_promo_percentage').val();
        var promo_category=$('#edit_promo_category').val();
        var status= $('#edit_status').val();
        var created_at= $('#edit_created_At').text();
        
        id=parseInt(id);
        status=parseInt(status);
        promo_percentage=parseFloat(promo_percentage);
         var isDataValid=true;
        if(isNaN(promo_percentage))
            isDataValid=false;
        
        if(isDataValid)
        {
        var json_obj={
            id : id,
            name :name,
            phone_no :phone_no,
            promo_code:promo_code,
            promo_percentage:promo_percentage,
            promo_category:promo_category,
            status :status,
            created_at:created_at
            };
        
         console.log("sending to database: "+JSON.stringify(json_obj));
        
        $.ajax({
	        type:'POST',
	        url:"http://localhost:9123/modifypromos",
	        dataType:"json",
	        data: json_obj,
	        success:function (json) {
                party_promo_table.ajax.reload(null,false);
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
        }
        else
            {
                alert("promo percentage is Invalid")
            }
        if(isDataValid)
        {
            $('#edit_record_modal').modal("hide");
             $('#edit_status_modal').modal("show");
        }
    } );
  
});
function isNumber(no) {
 var regex = /[0-9]{1,}/;
return regex.test(no);
}
