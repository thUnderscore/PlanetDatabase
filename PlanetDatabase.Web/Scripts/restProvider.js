function restProvider(baseUrl) {
    self = this;
    self.baseUrl = baseUrl;
    self.readUrl = self.baseUrl + "/Planets";

    self.getPlanets = function (onSuccess, onError) {
        $.ajax({
            url: this.readUrl,
            contentType: "application/json",
            accept: "application/json",
            type: "GET",
            success: function (data) {
                onSuccess(data);
            },
            error:  function (request, status, error) {
                onError("Can't request list. Original error: " + error);
            }
        });
    }

}