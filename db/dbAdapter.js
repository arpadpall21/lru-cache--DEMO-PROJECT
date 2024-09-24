const nrWord = ['zero', 'one', 'two', 'three', 'four',  'five', 'six', 'seven', 'eight', 'nine'];


class FakeDatabaseAdapter {
  async getContent(id) {
    let result = '';
    for (let n of id.toString()) {
      result += `${nrWord[n]}.`;
    }

    await this.wait(2);       // simulating 2 second latency
    return result;
  }

  wait(delaySec) {
    return new Promise((res) => {
      setTimeout(() => res(), delaySec * 1000)
    });
  }
}


const fakeDb = new FakeDatabaseAdapter();
export default fakeDb;
