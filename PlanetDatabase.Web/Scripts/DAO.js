function Planet(data) {
    var self = this;

    self.id = data.id;
    self.name = data.name;
    self.distanceToSunKm = isNaN(data.distanceToSunKm) ? 0 :  parseFloat(data.distanceToSunKm);
}
