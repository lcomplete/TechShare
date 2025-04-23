---
title: "七周七语言之用 ruby 做点什么"
date: 2013-05-25T15:50:08+08:00
keywords: []
description: ""
tags: ["编程语言", "编程", "ruby"]
categories: ["技术"]
toc: false
---

# 一段简单的ruby爬虫代码
> 每学一门语言，思维方式都会发生改变，编程语言亦是如此。

编程语言从范型上来划分，主要有过程式语言、面向对象式语言和函数式语言，只有了解这些语言的变化、发展和设计哲学，深入地学习它们，才能够将它们融汇贯通，体会到不同范型中的精华和思想。如今有众多的编程语言，五花八门，《七周七语言》中挑选了7门优秀的语言进行讲解，这些语言包括了以上三种范型，其中有Ruby这样的面向对象的脚本语言、Io这样的原型语言、Haskell这样的纯函数式语言，也有Scala这种融合了函数式编程和面向对象编程的语言，这些语言都有其特别的设计和独门绝技，比如Ruby的简洁、效率和它的元编程特性。

本次用Ruby写了一段抓取程序，可以抓取煎蛋上评分较高的有趣图片，其中解析html用到了nokogiri模块。这段程序总共只有几十行代码，为了多使用一些语言上的特性，还加了一些没必要的代码，如果再精简一下的话，这段程序可以非常简短，实在是不得不佩服ruby的简洁和效率。

不多说了，直接上代码吧！

``` ruby
#encoding: utf-8

require 'net/http'
require 'open-uri'
require 'nokogiri' # 用于解析html的模块
                   # sudo apt-get install libxslt-dev libxml2-dev 
                   # sudo gem install nokogiri
require 'pathname'

class JanDanSpider
    attr_accessor :base_uri, :cur_page # 定义属性访问器

    def initialize(pagesize)
        @base_uri = 'http://jandan.net/pic' # @表示实例变量、@@表示类变量、$表示全局变量
        @dir = '/media/Develop/MyCode/SevenLang/ruby/pic'
        @pagesize = Integer(pagesize) # 整型转换
    end

    def crawl()
        Dir.mkdir @dir unless File.directory? @dir # 表判断的方法结尾都有个?
        totalpage = crawlpage(0)
        puts "pagesize #{totalpage}" # ""字符会引发字符串替换，''则不会
        (1..@pagesize-1).each do |i| # 遍历元组
            crawlpage(totalpage - i)
        end
        puts 'complete!'
    end

    def crawlpage(page)
        url = page==0 ? @base_uri : @base_uri+'/page-'+page.to_s # to_s是必要的
        puts "crawl-page: #{url}"

        fpage = open(url)
        html = fpage.read
        doc = Nokogiri::HTML(html)
        doc.css('ol.commentlist li').each { |comment|
            match = /comment-(\d+)/.match(comment['id'])
            if match
                id = match[1]
                oo = Integer(comment.css('#cos_support'+'-'+id)[0].content);
                xx = Integer(comment.css('#cos_unsupport'+'-'+id)[0].content);
                xx = 1 if xx==0
                if(oo>xx && (oo>200 || oo/xx >10) )
                    src = comment.css('p img')[0]["src"]
                    puts "crawl: oo #{oo} xx #{xx} src #{src}"
                    save_pic(src)
                end
            end
        }
        if page==0
            cur_page = doc.css(".current-comment-page")[0].content
            page = Integer(/\d+/.match(cur_page).to_s)
        end
        puts "page #{page} done!"
        page # ruby中每条语句都有返回值，函数内最后一条语句的返回值会被return
    end

    def save_pic(url)
        urlpath = Pathname.new(url)
        filename = urlpath.basename.to_s
        dirpath = Pathname.new(@dir)
        filepath = dirpath.join(filename).to_s
        open(url) { |fin|
            open(filepath,"wb") { |fout|
                while buf = fin.read(4096) do
                    fout.write buf
                end
            }
        } unless File.exists? filepath # 仅当文件不存在时进行抓取
        puts 'done!'
    end

end

if ARGV.length == 1
    spider = JanDanSpider.new($*[0]) # 可从 ARGV 或 $* 读取命令行参数
    spider.crawl()
else
    puts 'please input pagesize' #tip: puts, 转义+换行符 print, 转义 p, 换行
end
```