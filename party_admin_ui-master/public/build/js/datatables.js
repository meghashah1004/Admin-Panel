 var  editor;
$(function(){
                      
var myTable=$("#datatable-test").DataTable({
    //loadUserDetails.do
    
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": true,
    "orderable": false,
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
            items: 'cell'
        },
    "data": [],
    "columns": [
        {
        "title": "S.No",
        "data": "id"
        },
        {
        "title": "Name",
        "data": "employee_name"
        },
        {
        "title": "salary",
        "data": "employee_salary",
         render: $.fn.dataTable.render.number( ',', '.', 0, '$' ) 
        },
        {
        "title": "age",
        "data": "employee_age"
        },
        {
         "defaultContent": "<button>Edit</button>",
         "data": null
        }
    ]
    }//data table end
);
    $.ajax({
        type: "GET",
        url: "http://192.168.3.35:4000/pool",
//        url: "http://dummy.restapiexample.com/api/v1/employees",
        success: function(result)
         {
            var rowData = JSON.parse(result);
             for ( var i = 50; i < 70; i++)
             {
//                console.log(rowData[i]);
                 var name=rowData[i].employee_name;
                 var salary=rowData[i].employee_salary;
                 var age=rowData[i].employee_age;
                 if(name==null | name=="")
                     rowData[i].employee_name="null";
                 if(salary==null )
                     rowData[i].employee_salary=0.0;
                 if(age==null )
                     rowData[i].employee_age="null";
                myTable.row.add( rowData[i] ).draw();
             }
         },
        error: function( textStatus, ex) {
                alert(textStatus + "," + ex + ",");
            }
    });
    $('#datatable-test tbody').on( 'click', 'button', function () {
        var data = myTable.row( $(this).parents('tr') ).data();
       console.log(data);
        $('#edit_id').val(data.id);
        $('#edit_name').val(data.employee_name);
        $('#edit_age').val(data.employee_age);
        $('#edit_salary').val(data.employee_salary);
        $('#edit_record_modal').modal("show");
    } );
    
    $('#submit_modal').on( 'click', function () {
       
        console.log("saving data");
        var id= $('#edit_id').val();
        var name= $('#edit_name').val();
        var age= $('#edit_age').val();
        var salary= $('#edit_salary').val();
        if(salary==null | salary=="" | isNumber(salary)==false )
        {
            console.log("error ");
            var salaryInput=$('#edit_salary');
            salaryInput.focus();
            salaryInput.value="";
            alert("Salary should be a number");
//            return false;
        }
        else
        {
            var sal=parseFloat(salary);
            var json_data="{";
            json_data=json_data.concat("\nid : ",id);
            json_data=json_data.concat("\nemployee_name : ",name);
            json_data=json_data.concat("\nemployee_salary : ",salary);
            json_data=json_data.concat("\nemployee_age : ",age);
            json_data=json_data.concat("\n}");
            console.log(json_data);
                $('#edit_record_modal').modal("hide");
                
        }
        
    } );
    
  
});
function isNumber(no) {
 var regex = /[0-9]{1,}/;
return regex.test(no);
}



//    paty user data table end

//    $.ajax({
//        type: "GET",
//        url: "http://localhost:4000/fetchusers",
//        success: function(result)
//         {
////            console.log(JSON.stringify(result));
//            var rowData = result;
////            var rowData = JSON.parse(result);
//             for ( var i =0; i < rowData.length; i++)
//             {
//                party_user_table.row.add( rowData[i] ).draw();
//             }
//         },
//        error: function( textStatus, ex) {
//                alert("error from fetch users"+textStatus + "," + ex + ",");
//            }
//    });