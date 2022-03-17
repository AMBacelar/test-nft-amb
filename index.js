import express from 'express';
import path from 'path';
import { faker } from '@faker-js/faker';

const PORT = process.env.PORT || 5000;
const HOST = 'https://mysterious-hamlet-89897.herokuapp.com';

const app = express()
  .set('port', PORT)
  .set('views', path.join(process.cwd(), 'views'))
  .set('view engine', 'ejs');

// Static public files
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', function (req, res) {
  res.send('Get ready for Release!');
});

app.get('/api/token/:token_id', function (req, res) {
  const tokenId = parseInt(req.params.token_id).toString();
  const fakeDate = faker.date.between(
    '2020-01-01T00:00:00.000Z',
    '2021-01-01T00:00:00.000Z'
  );
  const day = fakeDate.getDate();
  const month = fakeDate.getMonth() + 1;
  const data = {
    name: faker.name.findName(),
    description: faker.commerce.productDescription(),
    attributes: {
      birthday: `${day} ${fakeDate.toLocaleString('default', {
        month: 'long',
      })}`,
      'birth month': monthName(month),
      'zodiac sign': zodiac(day, month),
      'favorite music genre': faker.music.genre(),
    },
    image: `https://placeimg.com/512/512/nightlife`,
  };
  res.send(data);
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

// returns the zodiac sign according to day and month ( https://coursesweb.net/javascript/zodiac-signs_cs )
function zodiac(day, month) {
  var zodiac = [
    '',
    'Capricorn',
    'Aquarius',
    'Pisces',
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
  ];
  var last_day = ['', 19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
  return day > last_day[month] ? zodiac[month * 1 + 1] : zodiac[month];
}

function monthName(month) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNames[month - 1];
}
