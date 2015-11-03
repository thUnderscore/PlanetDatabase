
var indexViewModel;

function IndexViewModel(dataProvider) {

    self = this;
    self.dataProvider = dataProvider;
    self.planets;
    self.isLoaded;
    self.isLoadingError;
    self.LoadingErrorMessage;
    

    self.loadPlanetsList = function () {
        self.isLoaded = true;        
        if (dataProvider == null) {
            self.onError("dataProvider is not assigned");
            return;
        }
        dataProvider.getPlanets(self.onSuccess, self.onError);                
    };

    self.onError = function (message) {
        self.isLoaded = true;
        self.isLoadingError = true;
        self.LoadingErrorMessage = message;
        self.actualizeView();
    }

    self.onSuccess = function (list) {
        try {
            self.isLoaded = true;
                        

            $.each(list, function (index, item) {
                if (item) {
                    self.planets.push(new Planet(item));
                }                
            });

            self.planets.sort(function (a, b) {                
                return a.distanceToSunKm - b.distanceToSunKm;
            });

            self.actualizeView();
        } catch (e) {
            self.onError(self.getExceptionMessage(e));
        }        
    }
    
    self.actualizeView = function () {
        self.listContentElement = self.isLoadingError ? 
            self.createListContentError() : self.createListContentSuccess();
        if (self.listContentElement) {
            var listContainer = document.getElementById("listContainer");
            listContainer.appendChild(self.listContentElement);
        }
    }

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

    self.reload = function () {        
        try {
            self.clear();
            self.loadPlanetsList();
        } catch (e) {
            self.onError(self.getExceptionMessage(e));
        }        
    }
    
    self.createListContentSuccess = function() {
        var list = document.createElement("ul");
        list.className = "planetsList";

        $.each(indexViewModel.planets, function (index, planet) {
            var li = document.createElement("li");


            var pName = document.createElement("p");
            pName.innerHTML = planet.name;
            pName.className = "succcess";

            var pDistance = document.createElement("p");
            pDistance.innerHTML = "&nbsp;";
            pDistance.className = "succcess";

            pName.addEventListener("click", function () {
                pDistance.innerHTML = indexViewModel.fotmatDistance(planet.distanceToSunKm)
            }, false);

            li.appendChild(pName);
            li.appendChild(pDistance);
            list.appendChild(li);


        });

        for (var i = 0; i < indexViewModel.planets.length; i++) {
            var planet = indexViewModel.planets[i];


        }
        return list;
    }

    self.createListContentError = function () {         
        var errorElement = document.createElement("p");
        errorElement.className = "error";
        errorElement.innerHTML = self.LoadingErrorMessage;
        return errorElement;
    }


        

    self.getExceptionMessage = function (e) {
        return e.messaage ? e.messaage : e;
    }

        
    self.fotmatDistance = function (distance) {
        var distanceStr = "0";
        if (!isNaN(distance) && distance > 0) {
            var intPart = Math.trunc(distance);
            var floatPart = distance - intPart;
            if (intPart > 0) {
                distanceStr = "";
                while (intPart > 0) {
                    var rem = intPart % 1000;
                    var intPart = Math.floor(intPart / 1000);
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

function InitViewModel(dataProvider) {
    indexViewModel = new IndexViewModel(dataProvider);
    indexViewModel.reload();
}
