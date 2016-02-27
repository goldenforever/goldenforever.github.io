## Requirements Specification

From the specification:

> The method should be:
> - fast to write (important)
> - require little knowledge of web languages (important)
> - further accommodate those with knowledge of web development
> - documented

> The resulting website should have:
> - a level of consistency
> - content-aware display
> - basic modern styling
> - responsive design
> - fast to load
> - small (file size) without compromising functionality

### Targets

The project aims to have a balance between 'one-size fits all'
and aggressively context-predictive content display.

I will set this balance to be that which satisfies 95% of
the population for quantifiable metrics.

![](http://dcs.warwick.ac.uk/~csunbg/some-js/images/normal-distribution.png)

![](http://dcs.warwick.ac.uk/~csunbg/some-js/images/normal-distribution-both.png)

 Objective          | Target
--------------------|:-------------:
Fast to write       | *//to be minimised//*
Little knowledge    | *//to be minimised//*
Further accommodate | Each web language could still be easily included
Documented          | All encompassing documentation
Consistency         | The website should have continuity of style
Content-aware       | At minimum, looks for different 'types' of page content to match
Modern style        | Use modern principles and generally not look dated
Responsive design   | *//see below//*
Fast to load        | *//see below//*
Small file size     | *//see below//*

#### Responsive design

[This table](http://www.rapidtables.com/web/dev/screen-resolution-statistics.htm)
shows popular screen resolutions.

Screen resolution | Display ratio | Usage     | Screen size / type
------------------|---------------|-----------|-----------------
1366x768          | 16:9          | 19.1%     | 14" Notebook / 15.6" Laptop / 18.5" monitor
1920x1080         | 16:9          | 9.4%      | 21.5" monitor / 23" monitor / 1080p TV
1280x800          | 8:5           | 8.5%      | 14" Notebook
320x568           | 9:16          | 6.4%      | 4" iPhone 5
1440x900          | 8:5           | 5.7%      | 19" monitor
1280x1024         | 5:4           | 5.5%      | 19" monitor
320x480           | 2:3           | 5.2%      | 3.5" iPhone
1600x900          | 16:9          | 4.6%      | 20" monitor
768x1024          | 3:4           | 4.5%      | 9.7" iPad
1024x768          | 4:3           | 3.9%      | 15" monitor
1680x1050         | 8:5           | 2.8%      | 22" monitor
360x640           | 9:16          | 2.3%      |
1920x1200         | 8:5           | 1.7%      | 24" monitor
720x1280          | 9:16          | 1.6%      | 4.8" Galaxy S
480x800           | 3:5           | 1.1%      |
1360x768          | 16:9          | 0.9%      |
1280x720          | 16:9          | 0.9%      | 720p TV
                  |               | **84.1%** |

The 320x480 of the first three generations of the iPhone seem to provide
a lower bound as they are responsible for over 5% of web-page loads.

The 1920x1080 resolution will serve as an upper bound as larger screens are
responsible for less than 5% of web-page loads.

For the same reason, the screen will need to support resolutions between
16:9 in landscape to 16:9 in portrait.

//i.e. all of these//
(provided the short side is at least 320px, and the long side is no more than 1920px):

![](http://dcs.warwick.ac.uk/~csunbg/some-js/images/aspect-ratio-diagram.png)

#### Fast to load / Small file size
As part of Ofcom's duties as a regulator, they used 
[this data](http://media.ofcom.org.uk/content/posts/news/2015/one-in-three-uk-broadband-superfast)
from SamKnows (11/2014).

The minimum average download speed for a currently offered service (and over 99.5% in use are) in the UK is
7.5Mbit/s. Google says a website should aim to have loaded within a second and
so = 7.5(1-x)Mbits where x is the time taken to create the website.

Therefore I will sit an upper bound on 7.5Mbits as the size of the website *including* the assets.

The average size of the images on a web-page is 1.4Mbits (http://httparchive.org/trends.php),
so I will subtract the size of these assets from the upper bound to make a new
*//upper bound of 6.1Mbits//*.

Video would not affect the initial loading time on most modern browsers as it is part of the HTML5 standard.

Adding hosted libraries (js/css/fonts) through runtime adding of links seems to
be a very logical way to mitigate this upper bound whilst still retaining a
wide range of output formats.

---

As of 17/12/15 the single JavaScript file size is about 50KB in raw size (unminifed, uncompressed).

In combination of the raw assets, this size increases to 171.1KB ~ 2.8% of maximum allowed.

Interestingly, this website benefited greatly from Markdown being a smaller file than the HTML equivalent.

The Markdown files that generate this website are approximately 44KB in total - the minimised HTML equivalent
is 64KB and the unminimised HTML equivalent is approximately 104KB.

This means an approximate 20KB saving in file size, which is almost half the size of the 
unminimised Markdown compiler itself!

If the file is gzipped (compressed), you can expect the Markdown file size to be reduced by 70-75% as
it is not far from plaintext. If the markdown files used to generate this website's content were gzipped
they would only be approximately 13.2KB. //This would suggest websites that have a large amount of text
content would be require a smaller total file transfer using a Markdown runtime compiler//, which is an
interesting but beneficial byproduct of the project.

If the Markdown compiler JavaScript file was cached, the smaller total file transfer would no longer be offset by
the size of the compiler and therefore it would provide a smaller total file transfer for almost all websites.