rem Make sure Rpath is pointing to your local install of R.
    set Rpath="C:\Program Files\R\R-3.3.2\bin\R.exe"
        %Rpath% CMD BATCH --no-save --vanilla --slave --quiet addQueryData.R
