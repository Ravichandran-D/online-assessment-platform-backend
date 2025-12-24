const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question, defaultValue) {
  return new Promise(resolve => {
    const prompt = defaultValue ? `${question} (${defaultValue}): ` : `${question}: `;
    rl.question(prompt, answer => {
      resolve(answer && answer.trim() ? answer.trim() : defaultValue || '');
    });
  });
}

(async () => {
  try {
    console.log('This will create a .env file in the project root.');

    const mongo = await ask('MongoDB connection string (MONGO_URL)');
    const jwt = await ask('JWT secret (JWT_SECRET)');
    const jwtExpire = await ask('JWT expiry (JWT_EXPIRE)', '7d');
    const port = await ask('Server port (PORT)', '5000');

    if (!mongo || !jwt) {
      console.error('MONGO_URL and JWT_SECRET are required. Aborting.');
      process.exit(1);
    }

    const content = `MONGO_URL=${mongo}\nJWT_SECRET=${jwt}\nJWT_EXPIRE=${jwtExpire}\nPORT=${port}\n`;

    fs.writeFileSync('.env', content, { encoding: 'utf8', flag: 'w' });
    console.log('.env file created successfully.');
  } catch (err) {
    console.error('Failed to create .env:', err);
  } finally {
    rl.close();
  }
})();
