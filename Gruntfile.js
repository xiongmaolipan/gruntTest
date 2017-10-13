module.exports = function(grunt){
    grunt.initConfig({
       pkg:grunt.file.readJSON('package.json'), 
       uglify:{
         options:{
              //为true表示允许添加头部信息
             stripBanners:true,
             banner:'/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
         },
         build:{
             src:'build/built.js',
             dest:'build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
         }
       },
       sass:{
          dist:{
            files:{
              'src/main.css':'src/main.scss'
            }
          }
       },
       jshint:{
           options:{
                //大括号包裹
                curly: true,
                //对于简单类型，使用===和!==，而不是==和!=
                eqeqeq: true,
                //对于属性使用aaa.bbb而不是aaa['bbb']
                sub: true,
                //查找类似与if(a = 0)这样的代码
                boss: true,
                //指定运行环境为node.js
                node: true
           },
           build:['src/*.js']
       },
       //html 压缩
        htmlmin: { 
            options: { 
                //去掉HTML注释
                removeComments: true,
                //去掉节点间空格
                collapseWhitespace: true,
                //省略布尔类型的属性值 
                collapseBooleanAttributes: false,
                //去掉引号
                removeAttributeQuotes: true,
                //删除有默认值匹配的属性
                removeRedundantAttributes: true,
                //使用ducType简洁方式压缩
                useShortDoctype: true,
                //删除只有空白值的所有属性
                removeEmptyAttributes: true
            },
            build:{ 
                src: ['src/main.html'],
                dest: 'build/main.html'
            }
        },
       concat:{
           options:{
               separator:';',
               stripBanners:true,
               banner:'/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
           },
           dist:{
               src:['src/test.js','src/test2.js'],
               dest:'build/built.js'
           }
       },
       watch:{
           build:{
               files:['src/main.html','src/*.scss','src/*.js'],
               tasks:['htmlmin','jshint','sass','uglify','concat'],
               options:{
                   spawn:false
               }
           },
           livereload:{
                options:{
                    livereload:'<%= connect.options.livereload %>'
                },
                files:[
                    'src/main.html',
                    'src/main.css',
                    'build/built.js'
                ]
           }
       },
       connect:{
          options:{
                port: 9000,
                open: true,
                livereload:35729,
                hostname:'localhost'
          },
          server:{
            options:{
              port:9001,
              base:'./'
            }
          }
       }
    });
    //加载插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    //注册任务
    grunt.registerTask('default',['jshint','sass','concat','htmlmin','uglify','connect','watch']);
    
 }
