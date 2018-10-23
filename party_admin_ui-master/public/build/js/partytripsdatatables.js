 var  editor;
$(function(){

var party_trip_table=$("#datatable-trips").DataTable({
    //loadUserDetails.do
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": true,
     "orderable": true,
     "order": [[ 0, "desc" ]],
//    "targets": 0 ,
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
        url: "http://localhost:9123/gettrips",
        dataSrc: "rows"
    },    
    "columns": [
        {
        "title": "S.No",
        "data": "id",
        "orderable": true,
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
        "title": "Status",
        "data": "status",
        "defaultContent": "<span class='label label-primary'></span>"
        },
        {
        "title": "Booking Type",
        "data": "booking_type",
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
        "title": "Pickup Date",
        "data": "pickup_date"
        },
        {
        "title": "Pickup Time",
        "data": "pickup_time"
        },
        {
        "title": "Car_type",
        "data": "car_type",
        "class":"none"
        },
        {
        "title": "No of seats",
        "data": "num_seats",
        "class":"none"
        },
        {
        "title": "Return Trip",
        "data": "is_return_trip",
        "render": function ( data, type, row, meta ) {
            if(data)
                     return 'Yes';
            else 
                     return 'No';
            } ,
        "class":"none"
        },
        {
        "title": "No of days",
        "data": "num_days",
        "render": function ( data, type, row, meta ) {
            if(data=="" || data==null)
                     return 'null';
            else 
                     return data;
            } ,
        "class":"none"
        },
        {
        "title": "Average Distance",
        "data": "avg_distance",
        render: function ( data, type, row ) {
        return  data + 'km';
    },
        "class":"none"
        },
                {
        "title": "Average Duration",
        "data": "avg_duration",
            render: function ( data, type, row ) {
        return  data;
    },
        "class":"none"
        },
        {
        "title": "Average Fare",
        "data": "avg_fare",
        render: $.fn.dataTable.render.number( ',', '.', 0, 'Rs ' ),
        "class":"none"
        },
        {
        "title": "Fare with Toll",
        "data": "fare_with_toll",
        render: $.fn.dataTable.render.number( ',', '.', 0, 'Rs ' ),
        "class":"none"
        },
        {
        "title": "Fare without Toll",
        "data": "fare_without_toll",
        render: $.fn.dataTable.render.number( ',', '.', 0, 'Rs ' ),
        "class":"none"
        },
        {
        "title": "promo_code",
        "data": "promo_code",
        render: function(data,type, row, meta)
            {
            if(data=="")
               return "NONE";
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
         "defaultContent": "<button type='button' id='btn_edit' class='btn btn-primary  btn-sm'><span class='glyphicon glyphicon-edit' ></span></button>",
         "data": null,
        "class":"all"
        },
       
    ],
    "rowCallback": function(row, data){
        //status
    if(data.status==1){
        
        $('td:eq(3)', row).html("<label class='label label-lg label-warning'>Confirmed</label>" );
        $('td:eq(3)', row).css("font-size", "16px");
    }
    else if(data.status==0){
        
        $('td:eq(3)', row).html("<label class='label label-lg label-info'>Initiated</label>" );
        $('td:eq(3)', row).css("font-size", "18px");
//        $('td:eq(4)', row).css("color", "red");
    }else if(data.status==2){
        
        $('td:eq(3)', row).html("<label class='label label-lg label-primary'>Active</label>" );
        $('td:eq(3)', row).css("font-size", "18px");
//        $('td:eq(4)', row).css("color", "red");
    }else if(data.status==3){
        
        $('td:eq(3)', row).html("<label class='label label-lg label-success'>Completed</label>" );
        $('td:eq(3)', row).css("font-size", "18px");
//        $('td:eq(4)', row).css("color", "red");
    }else if(data.status==-2){
        
        $('td:eq(3)', row).html("<label class='label label-lg label-danger'>Canceled By Admin</label>" );
        $('td:eq(3)', row).css("font-size", "16px");
//        $('td:eq(4)', row).css("color", "red");
    }else if(data.status==-1){
        
        $('td:eq(3)', row).html("<label class='label label-lg label-danger'>Canceled By User</label>" );
        $('td:eq(3)', row).css("font-size", "16px");
//        $('td:eq(4)', row).css("color", "red");
    }
        
        //booking type
    if(data.booking_type=="Personal"){
        
        $('td:eq(4)', row).html("<label class='label label-lg label-primary'>"+data.booking_type+"</label>" );
        $('td:eq(4)', row).css("font-size", "16px");
    }
     else  if(data.booking_type=="Corporate"){
        $('td:eq(4)', row).html("<label class='label label-lg label-warning'>Initiated</label>" );
        $('td:eq(4)', row).css("font-size", "16px");
//        $('td:eq(4)', row).css("color", "red");
    }
    }
}
);//paty user data table end
    
//if status changes to confirmed
var previous="";
$("#edit_status").on('focus', function () {
        previous = this.value;
    }).change(function() {
        var current=this.value;
        console.log("from: "+previous+" to:"+current);
        if(previous=="0" && current=="1" )
        {
            $("#edit_license_plate").val("").prop('disabled', false);
            $("#edit_driver_name").val("").prop('disabled', false);
            $("#edit_driver_contact_number").val("").prop('disabled', false);
            $("#edit_owner_name").val("").prop('disabled', false);
            $("#edit_owner_contact_number").val("").prop('disabled', false);
//            $('#vehicleDetails').show();
        }
        
        if(current=="0" || current=='-1' || current=="-2")
        {
            $('#vehicleDetails').hide();
        }
        else if(current=="1" || current=='2' || current=="3")
        {
            $('#vehicleDetails').show();
        }
        previous = current;
    });
    
function addOptionsToStatusDropDown(addOptions)
{
    for(var i=0;i<addOptions.length;i++)
    {
        $("#edit_status option[value='"+addOptions[i]+"']").show();
        console.log(addOptions[i]+" added");
    }
}
function removeOptionsToStatusDropDown(removeOptions)
{
    for(var i=0;i<removeOptions.length;i++)
    {
        $("#edit_status option[value='"+removeOptions[i]+"']").hide();
        console.log(removeOptions[i]+" removed");
    }
}
function refreshStatusOptions(status)
{
    var addOptions=[];
    var removeOptions=[];
    if(status=="0")
    {
        addOptions=["0","1","-1","-2"];
        removeOptions=["2","3"];
    }
    else if(status=="1")
    {
        addOptions=["1","2","-1","-2"];
        removeOptions=["0","3"];
    }
    else if(status=="2")
    {
        addOptions=["3","2"];
        removeOptions=["0","1","-1","-2"];
    }
    else if(status=="3")
    {
        addOptions=["3"];
        removeOptions=["0","1","2","-1","-2"];
    } 
    else if(status=="-1")
    {
        addOptions=["-1"];
        removeOptions=["0","1","2","3","-2"];
    }
    else if(status=="-2")
    {
        addOptions=["-2"];
        removeOptions=["0","1","2","-1","3"];
    }
   
    addOptionsToStatusDropDown(addOptions);
    removeOptionsToStatusDropDown(removeOptions);
}
  
function  showVehicleDetails(data)
{
    var status=data.status;
    if(status==1 || status ==2 || status==3)
    {
        $("#edit_license_plate").val(data.license_plate).prop('disabled', true);
        $("#edit_driver_name").val(data.driver_name).prop('disabled', true);
        $("#edit_driver_contact_number").val(data.driver_contact_number).prop('disabled', true);
        $("#edit_owner_name").val(data.owner_name).prop('disabled', true);
        $("#edit_owner_contact_number").val(data.owner_contact_number).prop('disabled', true);
        $('#vehicleDetails').show();
    }
    else
         $('#vehicleDetails').hide();
}
var current_row;
   
    //edit trip
    $('#datatable-trips tbody').on( 'click', 'button', function () {
         current_row = $(this).parents('tr');//Get the current row
    if (current_row.hasClass('child')) {//Check if the current row is a child row
        current_row = current_row.prev();//If it is, then point to the row before it (its 'parent')
    }
    var data = party_trip_table.row(current_row).data();
    console.log('Row data:'+data);
    //At this point, current_row refers to a valid row in the table, whether is a child row (collapsed by the DataTable's responsiveness) or a 'normal' row
        
    var id=$(this).attr('id');
    console.log("id: "+id);
     
    if(id=='btn_edit')
    {
        $('#edit_id').text(data.id);
        $('#edit_name').text(data.name);
        $('#edit_phone_no').text(data.phone_no);
        $('#edit_created_At').text(data.created_at);
         $('#edit_booking_type').val(data.booking_type);
        $('#edit_pickup_loc').val(data.pickup_location);
        $('#edit_waypoints').val(data.waypoints);
        $('#edit_drop_loc').val(data.drop_location);
        $('#edit_pickup_date').val(data.pickup_date);
        $('#edit_pickup_time').val(data.pickup_time);
         $('#edit_car_type').val(data.car_type);
         $('#edit_num_seats').val(data.num_seats);
         $('#edit_status').val(data.status);
        $('#edit_is_return_trip').prop('checked',data.is_return_trip);
         $('#edit_num_days').val(data.num_days);
         $('#edit_avg_dist').val(data.avg_distance);
         $('#edit_avg_duration').val(data.avg_duration);
            console.log("avg_duration:"+data.avg_duration);
         $('#edit_avg_fare').val(data.avg_fare);
         $('#edit_fare_with_toll').val(data.fare_with_toll);
         $('#edit_fare_without_toll').val(data.fare_without_toll);
         $('#edit_promocode').val(data.promo_code);
        
        console.log('status:'+data.status);
        showVehicleDetails(data);
        refreshStatusOptions(data.status);
         
        $('#edit_record_modal').modal("show");
    }
    
    } );
    
    //saving trip changes
     var errorMessage="";
    $('#submit_trip_modal').on( 'click', function () {
       
        var data = party_trip_table.row(current_row).data();
        console.log("saving data");
        var id= $('#edit_id').text();
        var name= $('#edit_name').text();
        var phone_no= $('#edit_phone_no').text();
        var booking_type= $('#edit_booking_type').val();
        var pickupLoc=$('#edit_pickup_loc').val();
        var waypoints=$('#edit_waypoints').val();
        var dropLoc=$('#edit_drop_loc').val();
        var pickupDate=$('#edit_pickup_date').val();
        var pickupTime=$('#edit_pickup_time').val();
        var carType= $('#edit_car_type').val();
        var numSeats= $('#edit_num_seats').val();
        var status= $('#edit_status').val();
        var isReturnTrip=$('#edit_is_return_trip').prop('checked');
        var numDays= $('#edit_num_days').val();
        var avgDistance= $('#edit_avg_dist').val();
        var avgDuration= $('#edit_avg_duration').val();
        var avgFare= $('#edit_avg_fare').val();
        var fareWToll= $('#edit_fare_with_toll').val();
        var fareWOToll= $('#edit_fare_without_toll').val();
        var promoCode= $('#edit_promocode').val();
        console.log("checked: "+$('#edit_subscribed').prop('checked'));
        var created_at= $('#edit_created_At').text();
        
        id=parseInt(id);
        var numOfDays=parseInt(numDays);
        if(isNaN(numOfDays))
            numOfDays=null; 
        
        numSeats=parseInt(numSeats);
        status=parseInt(status);
        avgDistance=parseFloat(avgDistance);
        avgFare=parseFloat(avgFare);
        fareWToll=parseFloat(fareWToll);
        fareWOToll=parseFloat(fareWOToll);
        
        var isDataValid=true;
        if(data.status==0 && status==1)
        {
            
            isDataValid=assignVehicle(id);
        }
            
        if(isNaN(avgDistance) || isNaN(avgFare) ||isNaN(fareWToll) || isNaN(fareWOToll))
        {
            isDataValid=false;
            errorMessage+=" Some Numerical fields have invalid data\n";
        }
        if(isDataValid)
        {
                
        var json_obj={
            id : id,
            name :name,
            phone_no :phone_no,
            booking_type:booking_type,
            pickup_location:pickupLoc,
            waypoints:waypoints,
            drop_location:dropLoc,
            pickup_date       :pickupDate,
            pickup_time       :pickupTime,
            car_type        :carType,
            num_seats       :numSeats,
            status      :status,
            is_return_trip        :isReturnTrip,
            num_days      :numOfDays,
            avg_distance     :avgDistance,
            avg_duration     :avgDuration,
            avg_fare      :avgFare,
            fare_with_toll    :fareWToll,
            fare_without_toll     :fareWOToll,
            promo_code     :promoCode,
            created_at: created_at
            };
        
         console.log("sending trip details to database: "+JSON.stringify(json_obj));
        
        $.ajax({
	        type:'POST',
	        url:"http://localhost:9123/modifytrips",
	        dataType:"json",
	        data: json_obj,
	        success:function (json) {
                
//                update record in datatable
                party_trip_table.ajax.reload(null,false);
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
            alert(errorMessage);
        }
    if(isDataValid)
    {
        $('#edit_record_modal').modal("hide");
        $('#edit_status_modal').modal("show");
//     party_trip_table.row(current_row).data(json_obj).draw();
    }
    } );
    
    
    //save assigned vehicle details
    
    
function assignVehicle(tripId) {
       
        console.log("saving vehicle details for id: "+tripId);
        
         var license_plate = $("#edit_license_plate").val();
         var driver_name = $("#edit_driver_name").val();
         var driver_contact_number = $("#edit_driver_contact_number").val();
         var owner_name = $("#edit_owner_name").val();
         var owner_contact_number = $("#edit_owner_contact_number").val();
       
//        converting to json object
//        
             var json_obj = 
            { 
                "party_trip_id":tripId,
                "license_plate" : license_plate,
                "driver_name" : driver_name,
        	    "driver_contact_number" : driver_contact_number,
        	    "owner_name" : owner_name,
                "owner_contact_number":owner_contact_number,
         	 };
         
        var isVehicleAssigned=true;
       
	   if (license_plate==null || license_plate=="" || license_plate.length<8 )
        {
            $("#license_plate").focus();
            errorMessage+="license_plate number is invalid\n";
            isVehicleAssigned= false;
        }
        if (driver_name==null || driver_name=="")
        {
            $("#driver_name").focus();
            errorMessage+="driver_name is empty\n";
            isVehicleAssigned= false;
        }
        if (owner_name==null || owner_name=="")
        {
            $("#driver_name").focus();
            errorMessage+="owner name is empty\n";
            isVehicleAssigned= false;
        }
        if (driver_contact_number==null || driver_contact_number.length<10 || driver_contact_number=="" || isPhoneNo(driver_contact_number) == false)
        {
            $("#edit_driver_contact_number").focus();
           errorMessage+="Driver contact number is invalid\n";
            isVehicleAssigned= false;
         }
        if (owner_contact_number==null || owner_contact_number.length<10 || owner_contact_number=="" || isPhoneNo(owner_contact_number) == false)
        {
           $("#edit_owner_contact_number").focus();
            errorMessage+="owner contact number is invalid\n";
            isVehicleAssigned= false;
         }
        
        if(isVehicleAssigned)
        {
                
            console.log("sending vehicle details to database: "+JSON.stringify(json_obj));

            $.ajax({
                type:'POST',
                url:"http://localhost:9123/assignvehicle",
                dataType:"json",
                data: json_obj,
                success:function (json) {
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
                    

            return true;
        }
        else
        {
//            alert(errorMessage);
            return false;
        }
       
   
} ;
  
});
function isNumber(no) {
 var regex = /[0-9]{1,}/;
return regex.test(no);
}
function isPhoneNo(phone) {
 var regex = /[0-9]{10}/;
return regex.test(phone);
}

	