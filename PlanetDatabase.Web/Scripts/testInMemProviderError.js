function testInMemProviderError() {
    self = this;

    self.getPlanets = function (onSuccess, onError) {       

        onError("test error message");
    }

}