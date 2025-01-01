const path = require('path');

module.exports = {
  mode: 'development', // Режим разработки
  entry: './src/script.js', // Точка входа вашего JavaScript
  output: {
    filename: 'bundle.js', // Имя выходного бандла
    path: path.resolve(__dirname, 'dist'), // Путь к папке, куда будет складываться бандл
  },
   devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
   module: {
     rules: [
       {
         test: /\.css$/,
         use: ['style-loader', 'css-loader'],
       },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },
      {

        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      }
     ],
   },
};
