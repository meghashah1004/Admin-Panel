$(function(){

var party_commission_table=$("#datatable-commission").DataTable({
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
        url: "http://localhost:9123/getcommission",
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
        "title": "Phone No",
        "data": "phone_no"
        },
        {
        "title": "Email",
        "data": "email"
        },
        {
        "title": "Status",
        "data": "status",
        "defaultContent": "<span class='label label-primary'></span>"
        },
        {
        "title": "Pickup Location",
        "data": "pickup_location"
        },
        {
        "title": "Waypoints",
        "data": "waypoints",
         "render": function ( data, type, row, meta ) {
            if(data=="" || data==null)
                     return 'null';
            else 
                     return data;
            } 
        },
        {
        "title": "Drop Location",
        "data": "drop_location"
        },
        {
        "title": "Total Trip Amount",
        "data": "total_trip_amount",
        render: $.fn.dataTable.render.number( ',', '.', 0, 'Rs ' ),
        render: function(data,type, row, meta)
        {
            if(data=="" || data==null)
               return "0";
            else
                return data;
        },
        
        "class":"none"
        },
        {
        "title": "Percentage Commission",
        "data": "percentage_commission",
        render: function(data,type, row, meta)
        {
            if(data=="" || data==null)
               return "0";
            else
                return data;
        },
        "class":"none"
        },
        {
        "title": "Amount To Be Paid",
        "data": "amount_to_be_paid",
        render: $.fn.dataTable.render.number( ',', '.', 0, 'Rs ' ),
        render: function(data,type, row, meta)
        {
            if(data=="" || data==null)
               return "0";
            else
                return data;
        },    

        "class":"none"
        },
        
        {
        "title": "Payment Status",
        "data": "payment_status",
        "defaultContent": "<span class='label label-primary'></span>"
        },
        {
        "title": "Payment Mode",
        "data": "payment_mode",
        render: function(data,type, row, meta)
        {
           if(data=="" || data==null)
                     return 'null';
            else 
                     return data;
            } ,
        "class":"none"
        },
        {
        "title": "Account Information",
        "data": "account_information",
        render: function(data,type, row, meta)
            {
            if(data=="" || data==null)
                     return 'null';
            else 
                     return data;
        },
        "class":"none"
        },
        {
        "title": "Created At",
        "data": "created_at",
        "class": "none"
        },
        {
         "defaultContent": "<button type='button' class='btn btn-primary  btn-sm'><span class='glyphicon glyphicon-edit' ></span></button>",
         "data": null,
        "class":"all"
        },
        
    ],
    "rowCallback": function(row, data){
        // payment status
    if(data.status==0){
        
        $('td:eq(4)', row).html("<label class='label label-lg label-danger'>Pending</label>" );
        $('td:eq(4)', row).css("font-size", "16px");
    }
    else if(data.status==1){
        
        $('td:eq(4)', row).html("<label class='label label-lg label-info'>Initiated</label>" );
        $('td:eq(4)', row).css("font-size", "18px");
    }else if(data.status==2){
        
        $('td:eq(4)', row).html("<label class='label label-lg label-success'>Completed</label>" );
        $('td:eq(4)', row).css("font-size", "18px");
    }
        //payment status    
    if(data.payment_status==0){
        
        $('td:eq(11)', row).html("<label class='label label-lg label-danger'>Pending</label>" );
        $('td:eq(11)', row).css("font-size", "16px");
    }
    else if(data.payment_status==1){
        
        $('td:eq(11)', row).html("<label class='label label-lg label-info'>Initiated</label>" );
        $('td:eq(11)', row).css("font-size", "18px");
    }else if(data.payment_status==2){
        
        $('td:eq(11)', row).html("<label class='label label-lg label-success'>Completed</label>" );
        $('td:eq(11)', row).css("font-size", "18px");
    }
        
    }
    
}
);//paty user data table end
var current_row;
    $('#datatable-commission tbody').on( 'click', 'button', function () {
         current_row = $(this).parents('tr');//Get the current row
    if (current_row.hasClass('child')) {//Check if the current row is a child row
        current_row = current_row.prev();//If it is, then point to the row before it (its 'parent')
    }
        var data = party_commission_table.row(current_row).data();
    //At this point, current_row refers to a valid row in the table, whether is a child row (collapsed by the DataTable's responsiveness) or a 'normal' row
     
    console.log('Row data:'+data);

        $('#edit_id').text(data.id);
        $('#edit_name').text(data.name);
        $('#edit_phone_no').text(data.phone_no);
        $('#edit_email').text(data.email);
        $('#edit_pickup_loc').text(data.pickup_location);
        $('#edit_waypoints').text(data.waypoints);
        $('#edit_drop_loc').text(data.drop_location);
        $('#edit_total_trip_amount').val(data.total_trip_amount);
    $('#edit_percentage_commission').val(data.percentage_commission);
         $('#edit_amount_to_be_paid').val(data.amount_to_be_paid);
         $('#edit_payment_status').val(data.payment_status);
         $('#edit_payment_mode').val(data.payment_mode);
         $('#edit_account_inforamation').val(data.account_inforamation);
         $('#edit_status').val(data.status);
        $('#edit_created_At').text(data.created_at);
        $('#edit_record_modal').modal("show");
    } );
    
    $('#submit_modal').on( 'click', function () {
       
        console.log("saving data");
        var id= $('#edit_id').text();
        var name= $('#edit_name').text();
        var phone_no= $('#edit_phone_no').text();
        var email= $('#edit_email').text();
        var pickupLoc=$('#edit_pickup_loc').text();
        var waypoints=$('#edit_waypoints').text();
        var dropLoc=$('#edit_drop_loc').text();
         var total_trip_amount=$('#edit_total_trip_amount').val();
        var percentage_commission=$('#edit_percentage_commission').val();
         var amount_to_be_paid=$('#edit_amount_to_be_paid').val();
         var payment_status=$('#edit_payment_status').val();
         var payment_mode=$('#edit_payment_mode').val();
        var account_inforamation=$('#edit_account_inforamation').val();
        var status= $('#edit_status').val();
        var created_at= $('#edit_created_At').text();
        
        status=parseInt(status);
        id=parseInt(id);
        payment_status=parseInt(payment_status);
                    
        var isDataValid=true;
        var trip_amount=parseFloat(total_trip_amount);
        if(isNaN(trip_amount))
        {
            trip_amount=0;
            isDataValid=false;
        }
        var perc_amount=parseFloat(percentage_commission);
        if(isNaN(perc_amount))
        {
                perc_amount=0;
               isDataValid=false;
       }
        var amount_to_pay=parseFloat(amount_to_be_paid);
        if(isNaN(amount_to_pay))
        {
            amount_to_pay=0;
            isDataValid=false;
        }
        if(isDataValid)
        {
        var json_obj={
            id:id,
            name:name,
            phone_no:phone_no,
            email:email,
            pickup_location:pickupLoc,
            waypoints:waypoints,
            drop_location:dropLoc,
            total_trip_amount:trip_amount,
            percentage_commission:perc_amount,
            amount_to_be_paid:amount_to_pay,
            payment_status:payment_status,
            payment_mode:payment_mode,
            account_inforamation:account_inforamation,
            status:status,
            created_at:created_at
            };
        
         console.log("sending to database: "+JSON.stringify(json_obj));
        
        $.ajax({
	        type:'POST',
	        url:"http://localhost:9123/modifycommission",
	        dataType:"json",
	        data: json_obj,
	        success:function (json) {
                
                //                update record in datatable
                party_commission_table.ajax.reload(null,false);
                $('#edit_status_modal').modal("hide");

	            var responseJson = JSON.stringify(json);
	            console.log("Success => "+responseJson);
	            console.log("----------------END--------------------");
	        },
	        error: function (json) {
//                alert("update failed");
	            console.log("Failed");
	            var parsedJson = json;
	            console.log("Failed==>"+parsedJson);
	        }
		});
      }
        else
        {
            alert("Some Numerical field is invalid");
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
function calculate_amount_to_pay()
{
var totalTripAmountStr=$('#edit_total_trip_amount').val();
var percentageCommissionStr=$('#edit_percentage_commission').val();
var perc_amount=parseFloat(percentageCommissionStr);
var trip_amount=parseFloat(totalTripAmountStr);
if(perc_amount=="NaN")
    perc_amount=0;
if(trip_amount=="NaN")
    trip_amount=0;
console.log("trip: "+trip_amount);
console.log("%: "+perc_amount);
var toPay=trip_amount-(trip_amount*perc_amount*0.01);
$('#edit_amount_to_be_paid').val(toPay);
}

$( "#edit_total_trip_amount" ).change(function() {
    calculate_amount_to_pay();
});
$( "#edit_percentage_commission" ).change(function() {

calculate_amount_to_pay();
});