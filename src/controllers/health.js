class HealthController {
  constructor(HealthService, logger=console.log) {
    this.healthService = HealthService;
    this.checkHealth = this.checkHealth.bind(this);
  };

  checkHealth(_req, res) {
    res.send(this.healthService.checkHealth());
  };
}

module.exports = HealthController;
