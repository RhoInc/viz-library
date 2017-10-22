rem Make sure Rpath is pointing to your local install of R.
    set Rpath="C:\Program Files\R\R-3.3.2\bin\R.exe"
        %Rpath% CMD BATCH --no-save --vanilla --slave --quiet create_DM.R
        %Rpath% CMD BATCH --no-save --vanilla --slave --quiet create_AE.R
        %Rpath% CMD BATCH --no-save --vanilla --slave --quiet create_CM.R
        %Rpath% CMD BATCH --no-save --vanilla --slave --quiet create_SV.R
        %Rpath% CMD BATCH --no-save --vanilla --slave --quiet labs.R
        %Rpath% CMD BATCH --no-save --vanilla --slave --quiet create_LB.R
        %Rpath% CMD BATCH --no-save --vanilla --slave --quiet create_VS.R
        %Rpath% CMD BATCH --no-save --vanilla --slave --quiet create_anly.R
