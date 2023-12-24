---
layout: page
title: NANOGrav 15 yr data and Massive Gravity
description: reproducing the SGWB with massive gravity
img: assets/img/projects/mg_paper/cover.png
importance: 1
category: research
related_publications: Choi:2023tun
---
_This post summarizes the [paper](https://arxiv.org/abs/2312.03932)  I wrote with Jacob Magallanes, Murman Gurgenidze, and Tina Kahniashvili. The code for the paper is available [here](https://github.com/ChrisChoi314/constrain_mass_nanograv_15) and the TeX is available [here](https://github.com/ChrisChoi314/constraining_NANOGrav_paper)._

Content of this post is a work in progress! 

## Background 
On June 28th, 2023, the [NANOGrav collaboration](https://nanograv.org/collaboration/overview) published a series of papers ([1](https://ui.adsabs.harvard.edu/abs/2023ApJ...951L..11A/abstract), [2](https://ui.adsabs.harvard.edu/abs/2023ApJ...951L..50A/abstract), [3](https://ui.adsabs.harvard.edu/abs/2023ApJ...951L...8A/abstract), [4](https://ui.adsabs.harvard.edu/abs/2023ApJ...951L...9A/abstract), [5](https://ui.adsabs.harvard.edu/abs/2023ApJ...951L..10A/abstract), [6](https://ui.adsabs.harvard.edu/abs/2023ApJ...952L..37A/abstract)) on the detection of a [stochastic gravitational wave background](https://en.wikipedia.org/wiki/Gravitational_wave_background) (SGWB) with a [pulsar timing array](https://en.wikipedia.org/wiki/Pulsar_timing_array) (PTA) and its implications and methods. 

At around the same time, I, along with Jacob Magallanes and Murman Gurgenidze, were tasked by Prof. Tina Kahniashvili to reproduce the results of [Fujita et al. 2018](https://arxiv.org/abs/1808.02381) and [Gumrukcuoglu et al. 2012](https://arxiv.org/abs/1208.5975), in our efforts to eventually connect it with the NANOGrav results. The two papers detailed the observational prospects of the [minimal theory of massive gravity](https://arxiv.org/abs/1506.01594) (MTMG)  with different time-dependencies of the graviton mass. We had spent the majority of the summer to this end, and it wasn't until mid-October that I had finally reproduced the significant results from the two papers that we were ready to move on.

Prof. Kahniashvili had originally intended to use the NANOGrav 15 yr data (which we will refer to as NG15 to match our paper) to constrain the graviton mass, but to our surprise, two papers had already been published that did exactly this with the NANOGrav 15 yr results, [Wang et al. 2023](https://arxiv.org/abs/2307.04680), [Wu et al. 2023](https://arxiv.org/abs/2310.07469). We shifted our attention to the time-dependent model of MTMG, something no one had previously tried to connect with NG15. And thus, on October 17, 2023 at precisely 21:33 EST, I began writing the paper that we wanted to put out before any other group got to it. 

## 