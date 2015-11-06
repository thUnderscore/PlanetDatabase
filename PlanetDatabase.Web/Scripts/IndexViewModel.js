//object which maneges index page
var indexViewModel;

function IndexViewModel(dataProvider) {

    //Reference for using in functions
    self = this;
    //data providers. provides list of Planets
    self.dataProvider = dataProvider;
    //list of planets
    self.planets;
    //is page loading finished
    self.isLoaded;
    //is page loaded with error
    self.isLoadingError;
    //error message if page loaded with error
    self.LoadingErrorMessage;
    

    //Asynchronously loads planet lisr from dataprovider
    self.loadPlanetsList = function () {
        self.isLoaded = true;        
        if (dataProvider == null) {
            self.onError("dataProvider is not assigned");
            return;
        }
        dataProvider.getPlanets(self.onSuccess, self.onError);                
    };

    //Is called by dataProvider if planets loading failed
    self.onError = function (message) {
        self.isLoaded = true;
        self.isLoadingError = true;
        self.LoadingErrorMessage = message;
	//actualize view to display error
        self.actualizeView();
    }

    //Is called by dataProvider if planets loading finished successfully
    self.onSuccess = function (list) {
        try {
            self.isLoaded = true;
                        
	    //save planets to list
            $.each(list, function (index, item) {
                if (item) {
                    self.planets.push(new Planet(item));
                }                
            });
	    //sort list of planetsby distance
            self.planets.sort(function (a, b) {                
                return a.distanceToSunKm - b.distanceToSunKm;
            });
	    //actualize view to display planets
            self.actualizeView();
        } catch (e) {
            self.onError(self.getExceptionMessage(e));
        }        
    }

    //actualize view depends on isLoadingError flag
    self.actualizeView = function () {
	//get content according to isLoadingError value
        self.listContentElement = self.isLoadingError ? 
            self.createListContentError() : self.createListContentSuccess();
	//add element to page if not null
        if (self.listContentElement) {
            var listContainer = document.getElementById("listContainer");
            listContainer.appendChild(self.listContentElement);
        }
    }

    //cleare page state 
    self.clear = function () {
        self.isLoaded = false;
        self.isLoadingError = false;
        self.LoadingErrorMessage = null;
        self.planets = new Array();
        if (self.listContentElement) {
            var listContainer = document.getElementById("listContainer");
            listContainer.remove(self.listContentElement);
        }
        self.listContentElement = null;
    }

    //reload page. Cleare state and display planets list or error
    self.reload = function () {        
        try {
            self.clear();
            self.loadPlanetsList();
        } catch (e) {
            self.onError(self.getExceptionMessage(e));
        }        
    }
    
    //creates elements which represent list of planets
    self.createListContentSuccess = function() {
        var list = document.createElement("ul");
        list.className = "planetsList";

        $.each(indexViewModel.planets, function (index, planet) {
            var li = document.createElement("li");

	    //create name element
            var pName = document.createElement("p");
            pName.innerHTML = planet.name;
            pName.className = "succcess";
	    //create distance element
            var pDistance = document.createElement("p");
            pDistance.innerHTML = "&nbsp;";
            pDistance.className = "succcess";
            //add events listener to display distance on click
            pName.addEventListener("click", function () {
                pDistance.innerHTML = indexViewModel.fotmatDistance(planet.distanceToSunKm)
            }, false);

            li.appendChild(pName);
            li.appendChild(pDistance);
            list.appendChild(li);


        });

	
	//this loop should be removed
        for (var i = 0; i < indexViewModel.planets.length; i++) {
            var planet = indexViewModel.planets[i];
        }
        return list;
    }

    //creates element to display error instead of list of planets
    self.createListContentError = function () {         
        var errorElement = document.createElement("p");
        errorElement.className = "error";
        errorElement.innerHTML = self.LoadingErrorMessage;
        return errorElement;
    }

    //returns error message by object    
    self.getExceptionMessage = function (e) {
        return e.messaage ? e.messaage : e;
    }

    //format distance to display like "99,999,999.999999 km from Sun"
    self.fotmatDistance = function (distance) {
        var distanceStr = "0";
        if (!isNaN(distance) && distance > 0) {
            var intPart = Math.trunc(distance);
            var floatPart = distance - intPart;
            if (intPart > 0) {
                distanceStr = "";
                while (intPart > 0) {
                    var rem = intPart % 1000;
                    intPart = Math.floor(intPart / 1000);
                    if (intPart > 0) {
                        if (rem < 10) {
                            rem = ",00" + rem;
                        }
                        else if (rem < 100) {
                            rem = ",0" + rem;
                        } else {
                            rem = "," + rem;
                        }
                    }
                    distanceStr = rem + distanceStr;
                }
            }
            if (floatPart) {
                var floatPartStr = floatPart + "";
                distanceStr = distanceStr + "." + floatPartStr.substring(2, floatPartStr.length);
            }
        }

        return distanceStr + " km from Sun";
    }
}               

//inits indexViewModel object
function InitViewModel(dataProvider) {
    indexViewModel = new IndexViewModel(dataProvider);
    indexViewModel.reload();
}
