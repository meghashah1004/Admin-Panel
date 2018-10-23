$(function(){

var table=$("#ass_veh_det").DataTable({
    //loadUserDetails.do
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": true,
    "orderable": true,
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
//    processing: true,
//    serverSide: true,
    ajax: {
        url: "http://localhost:9123/getvehicledetails",
        dataSrc: "rows"
    },    
    "columns": [
         { 
              title:'id',
              data: 'id' 
            },
            { 
                title:'Trip Id',
                data: 'party_trip_id',
                class: 'all' 
            },
            { 
                title:'license_plate',
                data: 'license_plate',
            },
            { 
                title:'driver_name',
                data: 'driver_name',
            },
            {
                title:'driver_contact_number',
                data: 'driver_contact_number',
            },  
            { 
                title:'owner_name',
                data: 'owner_name',
            },
            {
                title:'owner_contact_number',
                data: 'owner_contact_number',
            },
            
            { 
                title:'created_at',
                data: 'created_at'
                 
            },
            
            {
                title:'status',
                data: 'status',
                class: 'all'
            },
            {
                title:'Edit',
                defaultContent: "<button type='button' class='btn btn-primary  btn-sm' id = 'btnEdit'><span class='glyphicon glyphicon-edit' ></span></button>",
                data:'null',
                class:'all'
            }

    ],
    "rowCallback": function(row, data){
        // payment status
     if(data.status==1){
            
            $('td:eq(8)', row).html("<label class='label label-lg label-warning'>Confirmed</label>" );
            $('td:eq(8)', row).css("font-size", "16px");
        }
        else if(data.status==0){
            
            $('td:eq(8)', row).html("<label class='label label-lg label-info'>Initiated</label>" );
            $('td:eq(8)', row).css("font-size", "18px");
    //        $('td:eq(4)', row).css("color", "red");
        }
        
    }
    
}
);//paty user data table end
    var current_row;
    $('#ass_veh_det tbody').on( 'click', 'button', function () {
         current_row = $(this).parents('tr');//Get the current row
    if (current_row.hasClass('child')) {//Check if the current row is a child row
        current_row = current_row.prev();//If it is, then point to the row before it (its 'parent')
    }
        var data = table.row(current_row).data();
    //At this point, current_row refers to a valid row in the table, whether is a child row (collapsed by the DataTable's responsiveness) or a 'normal' row
     
    console.log('Row data:'+data);

    var customerID = data['id'];
    var tripID = data['party_trip_id'];
    var license_plate = data['license_plate'];
    var driver_name = data['driver_name'];
    var driver_contact_number = data['driver_contact_number'];
    var owner_name = data['owner_name'];
    var owner_contact_number = data['owner_contact_number'];
    var created_at = data['created_at'];
    var status = data['status'];
    
    $("#edit_id").text(customerID);
    $("#edit_trip_id").text(tripID);
    $("#edit_created_at").text(created_at);
    $("#edit_status").text(status);
    $("#edit_license_plate").val(license_plate);
    $("#edit_driver_name").val(driver_name);
    $("#edit_driver_contact_number").val(driver_contact_number);
    $("#edit_owner_name").val(owner_name);
    $("#edit_owner_contact_number").val(owner_contact_number);
    
    $("#edit_record_modal").modal("show");
    } );
    
    $('#btnSubmit').on( 'click', function () {
       
        console.log("saving data");
         var customerID =  $("#edit_id").text();
         var tripID =  $("#edit_trip_id").text();
         var license_plate = $("#edit_license_plate").val();
         var driver_name = $("#edit_driver_name").val();
         var driver_contact_number = $("#edit_driver_contact_number").val();
         var owner_name = $("#edit_owner_name").val();
         var owner_contact_number = $("#edit_owner_contact_number").val();
         var created_at =  $("#edit_created_at").text();
         var status =  $("#edit_status").text();
        
        var isDataValid=true;
        
        var errorMessage="";
       if (license_plate==null || license_plate=="" || license_plate.length<8 )
        {
            $("#edit_license_plate").focus();
            errorMessage+="license_plate number is invalid\n";
            isDataValid= false;
        }
        if (driver_name==null || driver_name=="")
        {
            $("#edit_driver_name").focus();
            errorMessage+="driver_name is empty\n";
            isDataValid= false;
        }
        if (owner_name==null || owner_name=="")
        {
            $("#edit_owner_name").focus();
            errorMessage+="owner name is empty\n";
            isDataValid= false;
        }
        if (driver_contact_number==null || driver_contact_number.length<10 || driver_contact_number=="" || isNumber(driver_contact_number) == false)
        {
            $("#edit_driver_contact_number").focus();
           errorMessage+="Driver contact number is invalid\n";
            isDataValid= false;
         }
        if (owner_contact_number==null || owner_contact_number.length<10 || owner_contact_number=="" || isNumber(owner_contact_number) == false)
        {
           $("#edit_owner_contact_number").focus();
            errorMessage+="owner contact number is invalid\n";
            isDataValid= false;
        }
        if(isDataValid)
        {
//           alert("data is valid");
            
            var json_obj = { 
             "id" : customerID,
             "license_plate" : license_plate,
             "driver_name" : driver_name,
             "driver_contact_number" : driver_contact_number,
             "owner_name" : owner_name,
             "owner_contact_number":owner_contact_number,
             "created_at":created_at,
               "status" : status
             };
        
         console.log("sending to database: "+JSON.stringify(json_obj));
        
        $.ajax({
            type:'POST',
            url:"http://localhost:9123/modifyvehicledetails",
            dataType:"json",
            data: json_obj,
            success:function (json) {
                table.ajax.reload(null,false);
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
