class HydrationRepository {
  constructor(hydrationData) {
    this.data = hydrationData;
  }
}

if (typeof module !== 'undefined') {
  module.exports = HydrationRepository;
}