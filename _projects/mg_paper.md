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
----------------------------------------------
On June 28th, 2023, the [NANOGrav collaboration](https://nanograv.org/collaboration/overview) published a series of papers ([1](https://ui.adsabs.harvard.edu/abs/2023ApJ...951L..11A/abstract), [2](https://ui.adsabs.harvard.edu/abs/2023ApJ...951L..50A/abstract), [3](https://ui.adsabs.harvard.edu/abs/2023ApJ...951L...8A/abstract), [4](https://ui.adsabs.harvard.edu/abs/2023ApJ...951L...9A/abstract), [5](https://ui.adsabs.harvard.edu/abs/2023ApJ...951L..10A/abstract), [6](https://ui.adsabs.harvard.edu/abs/2023ApJ...952L..37A/abstract)) on the detection of a [stochastic gravitational wave background](https://en.wikipedia.org/wiki/Gravitational_wave_background) (SGWB) with a [pulsar timing array](https://en.wikipedia.org/wiki/Pulsar_timing_array) (PTA) and its implications and methods. 

At around the same time, I, along with Jacob Magallanes and Murman Gurgenidze, were tasked by Prof. Tina Kahniashvili to reproduce the results of [Fujita et al. 2018](https://arxiv.org/abs/1808.02381) and [Gumrukcuoglu et al. 2012](https://arxiv.org/abs/1208.5975), in our efforts to eventually connect it with the NANOGrav results. The two papers detailed the observational prospects of the [minimal theory of massive gravity](https://arxiv.org/abs/1506.01594) (MTMG)  with different time-dependencies of the graviton mass. We had spent the majority of the summer to this end, and it wasn't until mid-October that I had finally reproduced the significant results from the two papers that we were ready to move on.

Prof. Kahniashvili had originally intended to use the NANOGrav 15 yr data (which we will refer to as NG15 to match our paper) to constrain the graviton mass, but to our surprise, two papers had already been published that did exactly this with the NANOGrav 15 yr results, [Wang et al. 2023](https://arxiv.org/abs/2307.04680), [Wu et al. 2023](https://arxiv.org/abs/2310.07469). We shifted our attention to the time-dependent model of MTMG, something no one had previously tried to connect with NG15. And thus, on October 17, 2023 at precisely 21:33 EST, I began writing the paper that we wanted to put out as soon as we could.

## Gravitational Wave Background

What is a gravitational wave background? To even address this question, we must build up our intuition of gravitational waves. Gravity, one of the fundamental forces of nature that may or may not have a quantum field theoretic description, acts on any massive or energetic body. In order for the gravitational field to update with changes in the mass and energy distribution within spacetime, the information must be carried via some sort of messenger, much like in the case of the electromagnetic (EM) field. Whereas photons/EM  waves are what update the EM field, gravitons/gravitational waves (GWs) update the gravitational field. 

GWs are produced by accelerating mass/energy distributions, much like how light is produced by accelerating charges. They were first detected in September 14, 2015, almost exactly a century after they were first predicted by Albert Einstein in 1916 through his theory of general relativity (GR), by the Laser Interferometer Gravitational-Wave Observatory (LIGO) detectors at Hanford, Washington and Livingston, Louisiana. 

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
    <center>
        {% include figure.html path="assets/img/projects/mg_paper/first_ligo.png" title="first_ligo" class="img-fluid rounded z-depth-1" %}
    </center>
    </div>
</div>
<div class="caption">
    Figure 1: Fig 1 from [Abbott et al. 2016](https://journal.aps.org/prl/abstract/10.1103/PhysRevLett.116.061102), depicting the first measurement  GW event.
</div>   

The detected GWs were generated from a binary black hole merger ([Abbott et al. 2016](https://journal.aps.org/prl/abstract/10.1103/PhysRevLett.116.061102)), and since then, nearly a hundred GW events from black hole and neutron star mergers have been detected by the combined efforts of LIGO, Virgo, and KAGRA, the Italian and Japanese counterparts of LIGO respectively. Currently, the detectors have paused their run, and are under maintenance to improve the sensitivities, aiming to achieve observations of GWs every other day. 

So clearly, gravitational wave physics seems to be popping off. Where does NANOGrav fit in all of this? 