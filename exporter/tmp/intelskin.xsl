<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet version="1.0" xmlns:fo="http://www.w3.org/1999/XSL/Format"
                               xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" version="1.0" indent="yes"/>
<xsl:template match="/">
  <fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
    <fo:layout-master-set>
      <fo:simple-page-master page-height="297mm" page-width="210mm"
          margin="5mm 25mm 5mm 25mm" master-name="PageMaster-Cover">
        <fo:region-body    margin="20mm 0mm 20mm 0mm"/>
      </fo:simple-page-master>
      <fo:simple-page-master page-height="297mm" page-width="210mm"
          margin="25mm 25mm 25mm 25mm" master-name="PageMaster-TOC">
        <fo:region-body    margin="20mm 0mm 20mm 0mm"/>
      </fo:simple-page-master>
      <fo:simple-page-master page-height="297mm" page-width="210mm"
          margin="25mm 25mm 25mm 25mm" master-name="PageMaster-Legal">
        <fo:region-body    margin="20mm 0mm 20mm 0mm"/>
      </fo:simple-page-master>
      <fo:simple-page-master page-height="297mm" page-width="210mm"
          margin="5mm 25mm 5mm 25mm" master-name="PageMaster">
        <fo:region-body    margin="20mm 0mm 20mm 0mm"/>
      </fo:simple-page-master>
    </fo:layout-master-set>
   
   <fo:page-sequence master-reference="PageMaster-Cover">
      <fo:flow flow-name="xsl-region-body" >

        <fo:block-container xsl:use-attribute-sets="cover.intel.logo">
            <fo:block>
                <xsl:call-template name="intel.logo.img"/>
            </fo:block>
        </fo:block-container>   
        
        <fo:block-container xsl:use-attribute-sets="cover.title">
            <fo:block>
                <xsl:apply-templates select="./div/h1" />
                <!--<xsl:call-template name="cover.title"/> -->
                <!--<xsl:value-of select="/section/body/div/h1" disable-output-escaping="no" /> -->
            </fo:block>
        </fo:block-container>
        
        <fo:block-container xsl:use-attribute-sets="cover.icr.logo">
            <fo:block>
                <xsl:call-template name="icr.logo.img"/>
            </fo:block>
        </fo:block-container>        
      </fo:flow>
   </fo:page-sequence>
   
   <fo:page-sequence master-reference="PageMaster-Legal">
      <fo:flow flow-name="xsl-region-body" >
        <fo:block-container xsl:use-attribute-sets="legal">
           <xsl:call-template name="legal"/>
        </fo:block-container>
      </fo:flow>
   </fo:page-sequence>
   
   <fo:page-sequence master-reference="PageMaster-TOC">
      <fo:flow flow-name="xsl-region-body" >
<!--         <fo:block-container xsl:use-attribute-sets="toc"> -->
          <fo:block xsl:use-attribute-sets="h1">
                Table of Contents
	  </fo:block>
<!--         </fo:block-container> -->
      </fo:flow>
   </fo:page-sequence>
   
   <fo:page-sequence master-reference="PageMaster">
      <fo:flow flow-name="xsl-region-body" >
        <fo:block>
             <xsl:call-template name="contents"/>
        </fo:block>
      </fo:flow>
   </fo:page-sequence>
  </fo:root>
</xsl:template>

<!-- cover -->
<xsl:attribute-set name="cover.title" >
  <xsl:attribute name="space-before">25mm</xsl:attribute>
  <xsl:attribute name="space-before.conditionality">retain</xsl:attribute>
<!--   <xsl:attribute name="space-after">25mm</xsl:attribute> -->
  <xsl:attribute name="font-size">20pt</xsl:attribute>
  <xsl:attribute name="font-family">"sans-serif"</xsl:attribute>
  <xsl:attribute name="text-align">left</xsl:attribute>
  <xsl:attribute name="font-weight">bold</xsl:attribute>
 
</xsl:attribute-set>

<xsl:attribute-set name="cover.intel.logo" >
  <xsl:attribute name="text-align">right</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="cover.icr.logo" >
    <xsl:attribute name="space-before">30mm</xsl:attribute>
    <xsl:attribute name="space-before.conditionality">retain</xsl:attribute>
    <xsl:attribute name="text-align">right</xsl:attribute>
</xsl:attribute-set>

<!-- atributos deifnicion de date y version -->
<xsl:attribute-set name="legal" >
<xsl:attribute name="font-size">12pt</xsl:attribute>
<xsl:attribute name="font-family">sans</xsl:attribute>
<xsl:attribute name="text-align">left</xsl:attribute>
<!-- <xsl:attribute name="text-align-last">center</xsl:attribute> -->
<xsl:attribute name="width">160mm</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="toc" >
<xsl:attribute name="font-size">14pt</xsl:attribute>
<xsl:attribute name="font-family">serif</xsl:attribute>
<xsl:attribute name="text-align">center</xsl:attribute>
<xsl:attribute name="text-align-last">center</xsl:attribute>
<xsl:attribute name="width">160mm</xsl:attribute>
</xsl:attribute-set> 

<xsl:template name="intel.logo.img">
    <fo:block>
        <fo:external-graphic src="intel.png" content-width="130" content-height="90" />
    </fo:block>    
</xsl:template>
    
<xsl:template name="icr.logo.img">
     <fo:block > 
        <fo:external-graphic src="icr.png" content-width="150" content-height="175" />
    </fo:block>    
</xsl:template>

<!-- Template del TITULO de la caratula-->
<xsl:template name="cover.title" match="/div/h1" priority="0">
     <fo:block-container xsl:use-attribute-sets="cover.title">
        <fo:block >
            <xsl:apply-templates />
            
            <!--<fo:block space-before.minimum="20pt">
                <xsl:value-of select="/section/head/version" />
            </fo:block >
            <fo:block>
                <xsl:value-of select="/section/head/timestamp"/>
            </fo:block > -->
            
        </fo:block>
     </fo:block-container>
</xsl:template> 



  <xsl:template name="contents" match="/div" >
    <fo:block>
    </fo:block>
    <xsl:apply-templates select="/div/div"/>
</xsl:template>

<xsl:attribute-set name="h2">
    <xsl:attribute name="font-size">18pt</xsl:attribute>
    <xsl:attribute name="font-family">courier</xsl:attribute>
    <xsl:attribute name="text-align">left</xsl:attribute>
    <xsl:attribute name="font-weight">bold</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="h1">
    <xsl:attribute name="font-size">20pt</xsl:attribute>
    <xsl:attribute name="font-family">"Trebuchet MS", sans-serif, courier</xsl:attribute>
    <xsl:attribute name="text-align">left</xsl:attribute>
    <xsl:attribute name="font-weight">bold</xsl:attribute>
    <xsl:attribute name="margin-top">25px</xsl:attribute>
    <xsl:attribute name="margin-bottom">10px</xsl:attribute>
</xsl:attribute-set>

<xsl:template name="legal">
    <fo:block xsl:use-attribute-sets="h1">Legal Notices</fo:block>
    <fo:block space-after.minimum="15pt"> 
The information contained in this document is provided for informational purposes only and
represents the current view of Intel Corporation (“Intel”) and its contributors ("Contributors") on, as of
the date of publication. Intel and the Contributors make no commitment to update the information
contained in this document, and Intel reserves the right to make changes at any time, without notice.
THIS DOCUMENT IS PROVIDED "AS IS" WITH NO WARRANTIES WHATSOEVER, INCLUDING ANY
WARRANTY OF MERCHANTABILITY, NONINFRINGEMENT, FITNESS FOR ANY PARTICULAR PURPOSE,
OR ANY WARRANTY OTHERWISE ARISING OUT OF ANY PROPOSAL, SPECIFICATION OR SAMPLE.
</fo:block>
<fo:block space-after.minimum="15pt"> 
Intel disclaims all liability, including liability for infringement of any proprietary rights, relating to use
of information in this specification. No license, express or implied, by estoppels or otherwise, to any
intellectual property rights is granted herein.
Except that a license is hereby granted to copy and reproduce this Document for internal use only.
</fo:block>
<fo:block space-after.minimum="15pt"> 
This document is provided under the terms of the Intel® Cluster Ready Program Agreement between
Intel and your company.
</fo:block>
<fo:block space-after.minimum="15pt"> 
This document is subject to change, as described in the Intel® Cluster Ready Program Agreement.
Intel, the Intel logo, and Intel Xeon are trademarks or registered trademarks of Intel Corporation or its
subsidiaries in the United States and other countries.
</fo:block>
<fo:block space-after.minimum="15pt"> 
*Other names and brands may be claimed as the property of others.
</fo:block>
<fo:block space-after.minimum="15pt"> 
Copyright © 2006, 2007, 2008. Intel Corporation. All rights reserved.
</fo:block>

</xsl:template>

<xsl:template match="br">
  <fo:block>
  </fo:block>
</xsl:template>

<xsl:attribute-set name="p">
  <xsl:attribute name="text-indent">1em</xsl:attribute>
  <xsl:attribute name="space-before">0.6em</xsl:attribute>
  <xsl:attribute name="space-after">0.6em</xsl:attribute>
  <xsl:attribute name="text-align">justify</xsl:attribute>
  <xsl:attribute name="keep-together.within-page">always</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="bold">
  <xsl:attribute name="text-indent">1em</xsl:attribute>
  <xsl:attribute name="font-family">arial</xsl:attribute>
  <xsl:attribute name="font-size">12pt</xsl:attribute>
  <xsl:attribute name="text-align">left</xsl:attribute>
  <xsl:attribute name="font-weight">bold</xsl:attribute>
  <xsl:attribute name="margin-bottom">15px</xsl:attribute>
  <xsl:attribute name="margin-top">8px</xsl:attribute>

</xsl:attribute-set>
<xsl:template match="p">
  <fo:block xsl:use-attribute-sets="p">
        <xsl:apply-templates/>
  </fo:block>
</xsl:template>
<xsl:template match="h1">
  <fo:block xsl:use-attribute-sets="h1">
        <xsl:apply-templates/>
  </fo:block>
</xsl:template>


<xsl:template match="strong">
  <fo:inline xsl:use-attribute-sets="bold" >
    <xsl:apply-templates/>
  </fo:inline>
</xsl:template>

<xsl:template match="em">
  <fo:inline font-style="italic">
    <xsl:apply-templates/>
  </fo:inline>
</xsl:template>

<xsl:template match="u">
  <fo:inline text-decoration="underline">
    <xsl:apply-templates/>
  </fo:inline>
</xsl:template>

<xsl:param name="list-startdist-default" select="string('2em')"/>
<xsl:param name="list-gap-default" select="string('0.5em')"/>
<xsl:attribute-set name="list.item" >
  <xsl:attribute name="space-before">0.4em</xsl:attribute>
  <xsl:attribute name="space-after">0.4em</xsl:attribute>
  <xsl:attribute name="relative-align">baseline</xsl:attribute>
</xsl:attribute-set>

<xsl:template match="ul">
  <!-- determine the distance between the start of the list-item-label and the start
of the list-item-body, the distance between the end of the list-item-label and the
start of the list-item-body. -->
  <xsl:variable name="start-dist-local">
    <xsl:choose>
      <xsl:when test="./@startdist">
        <xsl:value-of select="./@startdist"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$list-startdist-default"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>
  <xsl:variable name="gap-local">
    <xsl:choose>
      <xsl:when test="./@gap">
        <xsl:value-of select="./@gap"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$list-gap-default"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>
  <!-- Generate fo:list-block. -->
  <fo:list-block provisional-distance-between-starts="{$start-dist-local}"
                  provisional-label-separation="{$gap-local}" >
    <!-- Process the descendants of li -->
    <xsl:apply-templates/>
  </fo:list-block>
</xsl:template>
<xsl:template match="ul/li">
  <fo:list-item xsl:use-attribute-sets="list.item" >
      <!-- Generate list label.-->
      <!-- The end position of the label is calculated by label-end()function. -->
      <!-- The characters for label of line are specified in the type attribute.
           Initial value is “&#x2022;” -->
    <fo:list-item-label end-indent="label-end()">
      <fo:block text-align="end">
        <xsl:choose>
          <xsl:when test="../@type='disc'">
            <xsl:text>●</xsl:text>
          </xsl:when>
          <xsl:when test="../@type='circle'">
            <xsl:text>○</xsl:text>
          </xsl:when>
          <xsl:when test="../@type='square'">
            <xsl:text>□</xsl:text>
          </xsl:when>
          <xsl:when test="../@type='bsquare'">
            <xsl:text>■</xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:text>&#x2022;</xsl:text>
          </xsl:otherwise>
        </xsl:choose>
      </fo:block>
    </fo:list-item-label>
    <!-- Generate the list body.-->
    <!-- The starting position of the label is calculated by
         the body-start() function -->
    <fo:list-item-body start-indent="body-start()" text-align="justify" >
      <fo:block>
        <xsl:apply-templates/>
      </fo:block>
    </fo:list-item-body>
  </fo:list-item>
</xsl:template>


<xsl:param name="list-startdist-default" select="string('2em')"/>
<xsl:param name="list-gap-default" select="string('0.5em')"/>
<xsl:attribute-set name="list.item" >
  <xsl:attribute name="space-before">0.4em</xsl:attribute>
  <xsl:attribute name="space-after">0.4em</xsl:attribute>
  <xsl:attribute name="relative-align">baseline</xsl:attribute>
</xsl:attribute-set>
<xsl:template match="ol">
  <!-- determine the distance between the start of the list-item-label and the start
of the list-item-body, the distance between the end of the list-item-label and the
start of the list-item-body. -->
  <xsl:variable name="start-dist-local">
    <xsl:choose>
      <xsl:when test="./@startdist">
        <xsl:value-of select="./@startdist"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$list-startdist-default"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>
  <xsl:variable name="gap-local">
    <xsl:choose>
      <xsl:when test="./@gap">
        <xsl:value-of select="./@gap"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$list-gap-default"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:variable>
  <!-- generate fo:list-block -->
  <fo:list-block provisional-distance-between-starts="{$start-dist-local}"
                  provisional-label-separation="{$gap-local}" >
    <!-- Process the descendants of li -->
    <xsl:apply-templates/>
  </fo:list-block>
</xsl:template>

<xsl:template match="ol/li">
  <fo:list-item xsl:use-attribute-sets="list.item">
    <!-- generate list-item-label-->
    <!-- the end position of the list-item-label is calculated by
         label-end() function -->
    <!-- label format is specified in the type attribute.
         The initial value is '1'.-->
    <fo:list-item-label end-indent="label-end()">
      <fo:block text-align="end">
        <xsl:choose>
          <xsl:when test="../@type">
            <xsl:number format="{../@type}"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:number format="1."/>
          </xsl:otherwise>
        </xsl:choose>
      </fo:block>
    </fo:list-item-label>
       <!-- generate the list-item-body -->
    <!-- The start position of the list-item-label is calculated by
         body-start() function -->
    <fo:list-item-body start-indent="body-start()" text-align="justify" >
      <fo:block>
        <!-- the descendants of li are specified by the descendants of templates. -->
        <xsl:apply-templates/>
      </fo:block>
    </fo:list-item-body>
  </fo:list-item>
</xsl:template>

<xsl:attribute-set name="p.warn" >
  <xsl:attribute name="border">solid</xsl:attribute>
  <xsl:attribute name="border-width">2px</xsl:attribute>
  <xsl:attribute name="border-color">red</xsl:attribute>
  <xsl:attribute name="padding">5px</xsl:attribute>
  <xsl:attribute name="margin">5px</xsl:attribute>
  <xsl:attribute name="width">80%</xsl:attribute>
  <xsl:attribute name="background-color">#f44</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="p.info" >
  <xsl:attribute name="border">solid</xsl:attribute>
  <xsl:attribute name="border-width">2px</xsl:attribute>
  <xsl:attribute name="border-color">green</xsl:attribute>
  <xsl:attribute name="padding">5px</xsl:attribute>
  <xsl:attribute name="margin">5px</xsl:attribute>
  <xsl:attribute name="width">80%</xsl:attribute>
  <xsl:attribute name="background-color">#4f4</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="p.adv" >
  <xsl:attribute name="border">solid</xsl:attribute>
  <xsl:attribute name="border-width">2px</xsl:attribute>
  <xsl:attribute name="border-color">blue</xsl:attribute>
  <xsl:attribute name="padding">5px</xsl:attribute>
  <xsl:attribute name="margin">5px</xsl:attribute>
  <xsl:attribute name="width">80%</xsl:attribute>
  <xsl:attribute name="background-color">#44f</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="p.rem" >
  <xsl:attribute name="border">solid</xsl:attribute>
  <xsl:attribute name="border-width">2px</xsl:attribute>
  <xsl:attribute name="border-color">gray</xsl:attribute>
  <xsl:attribute name="padding">5px</xsl:attribute>
  <xsl:attribute name="margin">5px</xsl:attribute>
  <xsl:attribute name="width">80%</xsl:attribute>
  <xsl:attribute name="background-color">#eee</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="pre.code" >
  <xsl:attribute name="border">solid</xsl:attribute>
  <xsl:attribute name="border-width">2px</xsl:attribute>
  <xsl:attribute name="border-color">gray</xsl:attribute>
  <xsl:attribute name="padding">5px</xsl:attribute>
  <xsl:attribute name="margin">5px</xsl:attribute>
  <xsl:attribute name="width">80%</xsl:attribute>
  <xsl:attribute name="font-family">monospace</xsl:attribute>
  <xsl:attribute name="white-space">pre</xsl:attribute>
  <xsl:attribute name="wrap-option">wrap</xsl:attribute>
  <xsl:attribute name="background-color">#eee</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="a" >
  <xsl:attribute name="color">blue</xsl:attribute>
  <xsl:attribute name="text-decoration">underline</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="note" >
  <xsl:attribute name="font-size">small</xsl:attribute>
  <xsl:attribute name="margin">0em</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="p.quote" >
  <xsl:attribute name="border">solid</xsl:attribute>
  <xsl:attribute name="border-width">2px</xsl:attribute>
  <xsl:attribute name="border-color">orange</xsl:attribute>
  <xsl:attribute name="padding">5px</xsl:attribute>
  <xsl:attribute name="margin">5px</xsl:attribute>
  <xsl:attribute name="width">80%</xsl:attribute>
  <xsl:attribute name="background-color">#fca</xsl:attribute>
</xsl:attribute-set>

<xsl:attribute-set name="span.quoteauthor" >
  <xsl:attribute name="font-size">small</xsl:attribute>
  <xsl:attribute name="font-style">italic</xsl:attribute>
  <xsl:attribute name="text-align">right</xsl:attribute>
</xsl:attribute-set>

<xsl:template match="p[@class = 'comment']">
</xsl:template>

<xsl:template match="p[@class = 'information']">
  <fo:block xsl:use-attribute-sets="p.info">
    <xsl:apply-templates/>
  </fo:block>
</xsl:template>

<xsl:template match="p[@class = 'warning']">
  <fo:block xsl:use-attribute-sets="p.warn">
    <xsl:apply-templates/>
  </fo:block>
</xsl:template>

<xsl:template match="p[@class = 'advice']">
  <fo:block xsl:use-attribute-sets="p.adv">
    <xsl:apply-templates/>
  </fo:block>
</xsl:template>

<xsl:template match="p[@class = 'reminder']">
  <fo:block xsl:use-attribute-sets="p.rem">
    <xsl:apply-templates/>
  </fo:block>
</xsl:template>

<xsl:template match="p[@class = 'quote']">
  <fo:block xsl:use-attribute-sets="p.quote">
    <xsl:apply-templates/>
  </fo:block>
</xsl:template>

<xsl:template match="span[@class = 'quoteauthor']">
 <fo:block xsl:use-attribute-sets="span.quoteauthor">
  <xsl:apply-templates/>
 </fo:block>
</xsl:template>

<xsl:template match="div[@class = 'code']">
  <fo:block xsl:use-attribute-sets="pre.code">
    <xsl:apply-templates/>
  </fo:block>
</xsl:template>

<xsl:template match="span[@class = 'foot']">
 <fo:footnote>
  <fo:inline baseline-shift="super" font-size="75%">
    <xsl:number level="any" count="span[@class = 'foot']" format="(1)"/>
   </fo:inline>
  <fo:footnote-body>
    <fo:block xsl:use-attribute-sets="note">
      <fo:inline baseline-shift="super" font-size="75%">
        <xsl:number level="any" count="span[@class = 'foot']" format="(1)"/>
      </fo:inline>
      <xsl:apply-templates/>
    </fo:block>
  </fo:footnote-body>
</fo:footnote>
</xsl:template>

<xsl:template match="a[@href]">
  <fo:basic-link>
    <xsl:if test="starts-with(@href,'#')">
      <xsl:attribute name="internal-destination">
        <xsl:value-of select="substring-after(@href,'#')"/>
      </xsl:attribute>
      <fo:inline xsl:use-attribute-sets="a">
        <xsl:apply-templates/>
      </fo:inline>
    </xsl:if>
    <xsl:if test="starts-with(@href,'#')=false">
      <xsl:attribute name="external-destination">
        <xsl:value-of select="@href"/>
      </xsl:attribute>
      <fo:inline xsl:use-attribute-sets="a">
        <xsl:variable name="anchor-texts">
          <xsl:apply-templates/>
        </xsl:variable>
        <xsl:apply-templates/>
        <xsl:if test="@href!=$anchor-texts">
          <fo:inline>
            <xsl:text> (</xsl:text>
            <xsl:value-of select="@href"/>
            <xsl:text>)</xsl:text>
          </fo:inline>
        </xsl:if>
      </fo:inline>
    </xsl:if>
  </fo:basic-link>
</xsl:template>





<xsl:attribute-set name="table.data" >
  <xsl:attribute name="table-layout">fixed</xsl:attribute>
  <xsl:attribute name="space-before">10pt</xsl:attribute>
  <xsl:attribute name="space-after">10pt</xsl:attribute>
</xsl:attribute-set>
<xsl:attribute-set name="table.data.caption" >
  <xsl:attribute name="font-family">sans-serif</xsl:attribute>
  <xsl:attribute name="text-align">start</xsl:attribute>
  <xsl:attribute name="space-before">3pt</xsl:attribute>
  <xsl:attribute name="space-after">3pt</xsl:attribute>
  <xsl:attribute name="space-after.precedence">2</xsl:attribute>
  <xsl:attribute name="font-weight">bold</xsl:attribute>
  <xsl:attribute name="keep-with-next.within-page">always</xsl:attribute>
</xsl:attribute-set>
<xsl:attribute-set name="table.data.th" >
  <xsl:attribute name="background-color">#000000</xsl:attribute>
  <xsl:attribute name="color">#ffffff</xsl:attribute>
  <xsl:attribute name="border-style">solid</xsl:attribute>
  <xsl:attribute name="border-width">1pt</xsl:attribute>
  <xsl:attribute name="padding-start">0.3em</xsl:attribute>
  <xsl:attribute name="padding-end">0.2em</xsl:attribute>
  <xsl:attribute name="padding-before">2pt</xsl:attribute>
  <xsl:attribute name="padding-after">2pt</xsl:attribute>
</xsl:attribute-set>
<xsl:attribute-set name="table.data.td" >
  <xsl:attribute name="border-style">solid</xsl:attribute>
  <xsl:attribute name="border-width">1pt</xsl:attribute>
  <xsl:attribute name="padding-start">0.3em</xsl:attribute>
  <xsl:attribute name="padding-end">0.2em</xsl:attribute>
  <xsl:attribute name="padding-before">2pt</xsl:attribute>
  <xsl:attribute name="padding-after">2pt</xsl:attribute>
</xsl:attribute-set>
<xsl:template match="table">
  
    <fo:table xsl:use-attribute-sets="table.data">
      <xsl:if test="@layout">
        <xsl:attribute name="table-layout">
          <xsl:value-of select="@layout"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="@width">
        <xsl:attribute name="inline-progression-dimension">
          <xsl:value-of select="@width"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </fo:table>
  
</xsl:template>
<xsl:template match="table/title">
</xsl:template>
<xsl:template match="col">
  <fo:table-column column-number="{@number}" column-width="{@width}"/>
</xsl:template>
<xsl:template match="thead">
  <fo:table-header start-indent="0pt" end-indent="0pt" >
    <xsl:apply-templates/>
  </fo:table-header>
</xsl:template>
<xsl:template match="tfoot">
  <fo:table-footer start-indent="0pt" end-indent="0pt" >
    <xsl:apply-templates/>
  </fo:table-footer>
</xsl:template>
<xsl:template match="tbody">
  <fo:table-body start-indent="0pt" end-indent="0pt">
    <xsl:apply-templates/>
  </fo:table-body>
</xsl:template>
<xsl:template match="tr">
  <xsl:element name="fo:table-row">
    <xsl:if test="@height">
        <xsl:attribute name="block-progression-dimension">
          <xsl:value-of select="@height"/>
        </xsl:attribute>
    </xsl:if>
    <xsl:apply-templates/>
  </xsl:element>
</xsl:template>
<xsl:template match="th">
  <fo:table-cell xsl:use-attribute-sets="table.data.th">
    <xsl:call-template name="cell-span"/>
    <xsl:if test="@valign">
      <xsl:attribute name="display-align">
        <xsl:value-of select="@valign"/>
      </xsl:attribute>
    </xsl:if>
    <fo:block>
      <xsl:if test="@align">
        <xsl:attribute name="text-align">
          <xsl:value-of select="@align"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </fo:block>
  </fo:table-cell>
</xsl:template>
<xsl:template match="td">
  <fo:table-cell xsl:use-attribute-sets="table.data.td">
    <xsl:call-template name="cell-span"/>
    <xsl:if test="@valign">
      <xsl:attribute name="display-align">
        <xsl:value-of select="@valign"/>
      </xsl:attribute>
    </xsl:if>
    <fo:block >
      <xsl:if test="@align">
        <xsl:attribute name="text-align">
          <xsl:value-of select="@align"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:apply-templates/>
    </fo:block>
  </fo:table-cell>
</xsl:template>
<xsl:template name="cell-span">
  <xsl:if test="@colspan">
    <xsl:attribute name="number-columns-spanned">
      <xsl:value-of select="@colspan"/>
    </xsl:attribute>
  </xsl:if>
  <xsl:if test="@rowspan">
    <xsl:attribute name="number-rows-spanned">
      <xsl:value-of select="@rowspan"/>
  </xsl:attribute>
  </xsl:if>
</xsl:template>







</xsl:stylesheet >


