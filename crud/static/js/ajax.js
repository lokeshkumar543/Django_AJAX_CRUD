  $("#btnsave").click(function(){
//    console.log("save button clicked");
    output="";
    let sid=$("#stid").val();
    let nm=$("#nameid").val();
    let em=$("#emailid").val();
    let pw=$("#passwordid").val();
    let csr=$("input[name=csrfmiddlewaretoken]").val();
    if(nm=="") {
        console.log("Please Enter Name");
    }
    else if(em=="") {
        console.log("Please Enter Email");
    }
    else if(pw==""){
        console.log("Please Enter Password");
    }else {
        mydata={stid:sid,name:nm,email:em,password:pw,csrfmiddlewaretoken:csr};
        $.ajax({
        url:"/save/",
        method:"POST",
        data:mydata,
        dataType:"json",
        success:function(data){
<!--            //console.log(data);-->
            x=data.student_data;
            if(data.status=="Save"){
                $("#msg").text("Form Submitted Successfully");
                $("#msg").show();
                for(i=0;i<x.length;i++){
                    output+="<tr><td>"+x[i].id+"</td><td>"+x[i].name+"</td><td>"+x[i].email+"</td><td>"+x[i].password+"</td><td>"+"<input type='button' class='btn btn-warning btn-sm btn-edit' value='Edit' data-sid="+x[i].id+">"+" <input type='button' class='btn btn-danger btn-sm btn-del' value='Delete' data-sid="+x[i].id+">";
                }
                $("#tbody").html(output);
                $("#stid").val("");
                $("form")[0].reset();
            }
            else if(data.status==0){
                $("#msg").text("UnSubmitted form");
                $("#msg").show();
                $("#stid").val("");
                $("form")[0].reset();
            }
        }
        });
       }
    });

  $("#tbody").on("click",".btn-del",function(){
//    console.log("Delete button");
    let id=$(this).attr("data-sid");
    let csr=$("input[name=csrfmiddlewaretoken]").val();
//    console.log(id);
    mydata={sid:id,csrfmiddlewaretoken:csr}
    mythis=this;
    $.ajax({
       url:"/delete/",
       method:"POST",
       data:mydata,
       datatype:"json",
       success:function(data){
//        console.log(data);
        if(data.status==1){
            $("#msg").text("Data Deleted Successfully");
            $("#msg").show();

            $(mythis).closest("tr").fadeOut();
        }else if(data.status==0){
            $("#msg").text("Unable to Delete Data");
            $("#msg").show();

        }
       }
    });
  });



$("#tbody").on("click",".btn-edit",function(){
//    console.log("Edit button");
    let id=$(this).attr("data-sid");
    let csr=$("input[name=csrfmiddlewaretoken]").val();
//    console.log(id);
    mydata={sid:id,csrfmiddlewaretoken:csr}
    $.ajax({
       url:"/edit/",
       method:"POST",
       data:mydata,
       datatype:"json",
       success:function(data){
//          console.log(data);
            $("#stid").val(data.id);
            $("#nameid").val(data.name);
            $("#emailid").val(data.email);
            $("#passwordid").val(data.password);
       }
    });
  });
