function testInMemProvider() {
    self = this;

    self.getPlanets = function (onSuccess, onError) {
        var result = new Array();

        result.push( {
            id: 0,
            name: "Planet1",
            distanceToSunKm: "-1.2"
        });

        result.push( {
            id: 1,
            name: "Planet2",
            distanceToSunKm: "0.2"
        });

        result.push( {
            id: 3,
            name: "Planet3",
            distanceToSunKm: "aaaa"
        })

        result.push( {
            id: 4,
            name: "Planet4",
            distanceToSunKm: "5"
        })

        result.push( {
            id: 5,
            name: "Planet5",
            distanceToSunKm: "99"
        })

        result.push( {
            id: 6,
            name: "Planet6",
            distanceToSunKm: "5.6"
        })

        onSuccess(result);
    }

}