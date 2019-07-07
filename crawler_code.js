function loadEvents() {
    const count = +$('.header-list').text().trim().split(' ').shift();
    
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            const visible = document.querySelectorAll('.event-box-link').length;
            
            if (visible >= count) {
                resolve();
                clearInterval(interval);
            } else {
                console.log('more', visible, 'of', count);
                click('#more-events');
                document.documentElement.scrollTop = document.documentElement.scrollHeight - 1500;
            }
            
        }, 5000);
    });
}


function createParses() {
  const links = document.querySelectorAll('.event-box-link');
  var parses = [];
  
  links.forEach((link) => {
    const url = link.getAttribute('href');
    parses.push({
        url, 
        step: 'parseEvent',
        params: {id: url.split('__').pop()}
    });
  });
  
  parses = parses.slice(0, 5);
  return Promise.resolve(parses);
}


steps.start = function () {
    loadEvents()
        .then(createParses)
        .then((parses) => {
            emit('Parses', parses);
            next(parses);
            done();
        })
};


steps.parseEvent = function ({id}) {
    const event = {
        id,
        name: $('.event-name').text().trim() || $('.uppercase').text().trim(),
        place: $('.event-info-city').text().trim() || $('.uppercase').next().text().trim(),
        time: $('.event-info-calendar').text().trim() || $('.fa-calendar').parent().text().trim(),
        url: document.location.href
    }
    emit('Events', [event]);
    done();
};