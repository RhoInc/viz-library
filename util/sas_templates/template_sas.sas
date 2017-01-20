/**************************************
   title: "My New Figure"
   description: 
   author:
   language:
   package:
   plot type:
   features:
**************************************/

/* Replace dummy figure code with your own code
       and output your figure as a PNG    */

ods graphics / reset imagename = "new_fig_name"  imagefmt = png border=no height=5.5in;
ods listing gpath = "new-fig-dir";

proc sgplot data=sashelp.cars;
   scatter x=mpg_city y=mpg_highway;
run;


/*
proc iml;
 submit / R;
# Create tags and README.md
source('scripts/createSuppFiles.R')
createSuppFiles(new_fig_name, example_type='R-examples')
endsubmit;

