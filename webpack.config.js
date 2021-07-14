//Configuración del webpack según la documentación

//WP se ejecuta en node, por eso la forma de importar es similar
const HtmlWebPackPlugin = require('html-webpack-plugin');

//importacion del plugin para mover el css a la carpeta dist
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//mover la imagen de manera fisica requiere que se cargue el siguiente plugin
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    //propiedad mode
    mode: 'development',
    // se limpia la carpeta dist antes de generar una nueva
    output: {
        clean: true
    },
    //inicia la configuracon del WP
    module: {
        //A fin de ue cargue el archivo .css, 
        //Archivo de reglas que rigen mi WP 
        rules: [
            // regla para el css
            {

                test: /\.css$/, //expresion regular.  busca todos los archivos .css 
                exclude: /style\.css$/i, //para que el WP siga evaluando los archivos css y excluya este de su busqueda
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            //Para cargar el css en el dist, se debe añadir una nueva reagla
            //primeramente instalamos la sienguiente dependencia
            //npm install --save-dev mini-css-extract-plugin
            {
                test: /style\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            //regla para el html
            {
                //Se necesita mover el archivo index a la capeta dist para su funcionamiento en produccion
                // se intalan los siguientes plogins:
                //npm i -D html-loader html-webpack-plugin
                //estos achivo permiten moverel index al dist, y que WP inserte el bundle en el index
                //asegurarse de tenerlos en el package.json
                test: /\.html$/i, //expresion regular.  busca todos los archivos .html. 
                loader: 'html-loader',
                // realiza tareas automaticas por nosotros mientras mueve el html al dist
                options: {
                    //se cambia el attributes por sources
                    sources: false,
                    //minimiza el codigo a una sola linea
                    minimize: false
                }
            },
            //regla para evaluar el tipo de imagen
            {
                test: /\.(png|jpe?g|gif)$/i,
                //segun la documentacion,  esto se debe añadir y así si funciona
                loader: 'file-loader',
                // test: /\.(png|jpe?g|bin|gif)$/i,
                options: {
                    name: '[path][name].[ext]',
                },

            }

        ]
    },
    plugins: [
        new HtmlWebPackPlugin({ // en este punto solo se ha establecido una relacion con el index del dist
            template: './src/index.html', // archivo en el cual se basa el  index del dist
            filename: './index.html' //nombre de salida 
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css', // filename: 'styles.[fullhash].css',
            ignoreOrder: false
        }),
        //copia la imagen al dist
        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "assets/" },
            ]
        }),
    ]
}

//para solucionar problemas de visualizaciones de debe intalas el paquede
//npm i -D webpack-dev-server