import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

import { Minimal } from "core/Layouts";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },
}));

const TermsAndConditions = (props) => {
  const classes = useStyles();

  return (
    <Minimal>
      <div className={classes.root}>
        <Typography className={classes.title} variant="h3">
          Terms And Conditions
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Thank you for visiting this Site, which is owned and operated by
          AreoLand. These Terms of Use govern your use of this Site.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Your acceptance of these terms of use
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          These Terms of Use apply to all users of this Site, whether or not you
          are a registered member. By using this Site you are agreeing to comply
          with and be bound by these Terms of Use. If you do not agree to these
          Terms of Use, you may not access or use this Site.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Your acceptance of our privacy policy
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          By agreeing to these Terms of Use, you agree to the terms of our
          PRIVACY POLICY, which is expressly incorporated herein. Before using
          this Site, please carefully review our Privacy Policy. All personal
          information provided to us as a result of your use of this Site will
          be handled in accordance with our Privacy Policy. To the extent there
          are inconsistencies between these Terms of Use and our Privacy Policy,
          these Terms of Use control.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Your consent to other agreements
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          When you sign up to use a special feature of this Site, you may be
          asked to agree to special terms governing your use of the special
          feature. In such cases, you may be asked to expressly consent to the
          special terms, for example, by checking a box or clicking on a button
          marked “I agree.” This type of agreement is known as a “click-through”
          agreement. If any of the terms of the click-through agreement are
          different than the terms of these Terms of Use, the terms of the
          click-through agreement will supplement or amend these Terms of Use,
          but only with respect to the matters governed by the “click-through
          agreement.”
        </Typography>

        <Typography className={classes.title} variant="h5">
          Ownership of this site and it's content
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          This Site, including all its Content are protected under applicable
          intellectual property and other laws, including without limitation the
          laws of the United States and other countries. All Content and
          intellectual property rights therein are the property of AreoLand or
          the material is included with the permission of the rights owner and
          is protected pursuant to applicable copyright and trademark laws. The
          presence of any Content on this Site does not constitute a waiver of
          any right in such Content. You do not acquire ownership rights tor any
          such Content viewed through this Site. Except as otherwise provided
          herein, none of this Content may be used, copied, reproduced,
          distributed, republished, downloaded, modified, displayed, posted or
          transmitted in any form or by any means, including, but not limited
          to, electronic, mechanical, photocopying, recording, or otherwise,
          without our express prior written permission. Permission is hereby
          granted to the extent necessary to lawfully access and use this Site
          and to display, download, or print portions of this Site on a
          temporary basis and for your personal, educational, noncommercial use
          only, provided that you
          <ol>
            <li>do not modify the Content</li>
            <li>
              you retain any and all copyright and other proprietary notices
              contained in the Content
            </li>
            <li>
              you do not copy or post the Content on any network computer or
              broadcast the Content in any media. Trademarks
            </li>
          </ol>
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          The AreoLand names and logos (including, without limitation, those of
          its affiliates), all product and service names, all graphics, all
          button icons, and all trademarks, service marks and logos appearing
          within this Site, unless otherwise noted, are trademarks (whether
          registered or not), service marks and/or trade dress of AreoLand
          and/or its affiliates (the “AreoLand Marks”). All other trademarks,
          product names, company names, logos, service marks and/or trade dress
          mentioned, displayed, cited or otherwise indicated within this Site
          are the property of their respective owners. You are not authorized to
          display or use the AreoLand Marks in any manner without our prior
          written permission. You are not authorized to display or use
          trademarks, product names, company names, logos, service marks and/or
          trade dress of other owners featured within this Site without the
          prior written permission of such owners. The use or misuse of the
          AreoLand Marks or other trademarks, product names, company names,
          logos, service marks and/or trade dress or any other materials
          contained herein, except as permitted herein, is expressly prohibited.
          Responsibility for User-Generated Content Posted on or Through this
          Site
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          You are responsible for User-Generated Content that you post. Under no
          circumstances will we be liable in any way for any UGC. This means
          that you, not AreoLand, are entirely responsible for all UGC that you
          post and that you can be held personally liable for comments that are
          defamatory, obscene, or libelous, or that violate these Terms of Use,
          an obligation of confidentiality, or the rights of others. If any part
          of the UGC you post is not your original work, it is your
          responsibility to obtain any necessary permission to post it. Because
          we do not control the UGC posted on or through this Site, we cannot
          and do not warrant or guarantee the truthfulness, integrity,
          suitability, or quality of that UGC. You also agree and understand
          that by accessing this Site, you may encounter UGC that you may
          consider to be objectionable. We have no responsibility for any UGC,
          including without limitation any errors or omissions therein. We are
          not liable for any loss or damage of any kind you may claim was
          incurred as a result of the use of any UGC posted, emailed,
          transmitted or otherwise made available on or through this Site. The
          UGC posted on or through this Site expresses the personal opinions of
          the individuals who posted it and does not necessarily reflect the
          views of AreoLand or any person or entity associated with AreoLand.
          You own User-Generated Content, but we may use it. You own the
          copyright in any original UGC you post. We do not claim any copyrights
          in UGC. However, by using this Site you are granting us and our
          subsidiaries, affiliates, successors and assigns, a nonexclusive,
          fully paid, worldwide, perpetual, irrevocable, royalty-free,
          transferable license (with the right to sublicense through unlimited
          levels of sublicensees) to use, copy, modify, distribute, publicly
          display and perform, publish, transmit, remove, retain repurpose, and
          commercialize UGC you post in any and all media or form of
          communication whether now existing or hereafter developed, without
          obtaining additional consent, without restriction, notification, or
          attribution, and without compensating you in any way, and to authorize
          others to do the same. For this reason, we ask that you not post any
          UGC that you do not wish to license to us, including any photographs,
          videos, confidential information, or product ideas. AreoLand and its
          Partners reserve the right to display advertisements in connection
          with your UGC and to use your UGC for advertising and promotional
          purposes.
          <br />
          We may disclose and/or remove User-Generated Content. AreoLand has
          certain rights. We have the right (but do not assume the obligation)
          to:
          <ul>
            <li>monitor all UGC</li>
            <li>require that you avoid certain subjects</li>
            <li>
              remove or block any UGC at any time without notice at our sole and
              absolute discretion
            </li>
            <li>
              disclose any UGC and the identity of the user who posted it in
              response to a subpoena or whenever we believe that disclosure is
              appropriate to comply with the law or a court order, to prevent or
              investigate a possible crime or other violation of law, to protect
              the rights of AreoLand or others, or to enforce these Terms of Use
            </li>
            <li>
              terminate your access to and use of this Site, or to modify, edit
              or block your transmissions thereto, for any reason and in our
              sole discretion. You agree that our exercise of such discretion
              shall not render us the owners of UGC you post, and that you will
              retain ownership thereof as described above. Restrictions on
              User-Generated Content. It is a condition of these Terms of Use
              that you do not
            </li>
            <li>
              upload, post, transmit or otherwise make available or any UGC that
              is unlawful, harmful, hateful, threatening, abusive, harassing,
              libelous, defamatory, obscene, vulgar, pornographic, profane,
              racially disparaging, indecent, or invasive of another’s privacy;
              or any UGC that constitutes or encourages activity illegal under
              criminal or civil law; or any UGC that is false, misleading, or
              fraudulent; or any UGC that you do not have a right to make
              available under any law or under contractual or fiduciary
              relationships (such as inside information or proprietary and
              confidential information learned or disclosed as part of
              employment relationships or under nondisclosure agreements); or
              any UGC that violates or infringes upon the rights of others,
              including UGC which violates the patent rights, copyrights,
              trademark rights, privacy rights, publicity rights, trade secret
              rights, confidentiality rights, contract rights, or any other
              rights of any individual, living or deceased, or any legal entity;
              o any UGC that contains the image, name or likeness of anyone
              other than yourself, unless (i) that person is at least eighteen
              years old and you have first obtained his/her express permission
              or (ii) that person is under eighteen years old but you are
              his/her parent or legal guardian; or any request for or
              solicitation of any personal or private information from any
              individual to the extent such request is not consistent with the
              networking goals of this Site; or any material that contains
              software viruses or any other computer code, files or programs
              designed to interrupt, destroy or limit the functionality of any
              computer software or hardware or telecommunications equipment
            </li>
            <li>
              impersonate any person or entity or falsely state or otherwise
              misrepresent your affiliation with a person or entity; or •
              violate any local, state, national or international law, rule or
              regulation. By posting User-Generated Content, you represent and
              warrant that (i) you own or otherwise control all of the rights to
              the UGC and have the right to grant the license set forth in these
              Terms of Use; (ii) the UGC is accurate, and (iii) you have read
              and understood—and your UGC fully complies with—these Terms of Use
              and applicable laws and will not cause injury tor any person or
              entity
            </li>
          </ul>
        </Typography>

        <Typography className={classes.title} variant="h5">
          Removal of content
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          In general. You can seek removal of objectionable UGC, and lodge
          complaints against particular users, by contacting us at
          support@areoland.com. We will endeavor to review such requests and to
          remove UGC and users that we determine should be removed, in our sole
          discretion and in accordance with these Terms of Use and applicable
          law. However, by providing a mechanism for the submission of
          complaints, we make no promises that we will review all such
          complaints or that we will take any action in response to such
          complaints. Please be aware, however, that if the UGC has already been
          distributed to other websites or published in other media, we will not
          be able to recapture and delete it. Also, a back-up or residual copy
          of the UGC we remove from this Site may remain on back-up servers.
          <br />
          Violation of copyrights. AreoLand does not knowingly violate or permit
          others to violate the copyrights of others. We will promptly remove or
          disable access to material that we know is infringing or if we become
          aware of circumstances from which infringing activity is apparent.
          <br />
          If you are requesting removal of content because of a violation of
          your copyrights, please note that the Digital Millennium Copyright Act
          of 1998 (the “DMCA”) provides recourse for copyright owners who
          believe that material appearing on the Internet infringes their rights
          under U.S. copyright law. If you believe that your own work, or the
          work of a third party for whom you are authorized to act, is featured
          on this Site or has been otherwise copied and made available on this
          Site in a manner that constitute copyright infringement, please notify
          us immediately. Your notice must be in writing and must include
          <ul>
            <li>
              an electronic or physical signature of the copyright owner or of
              the person authorized to act on behalf of the owner of the
              copyright interest
            </li>
            <li>
              a description of the copyrighted work that you claim has been
              infringed
            </li>
            <li>
              a description of where the material that you claim is infringing
              is located on this Site (including the URL, title and/or item
              number if applicable, or other identifying characteristics)
            </li>
            <li>
              your name, address, telephone number, and email address, and, if
              you are not the owner of the copyright, the name of the owner
            </li>
            <li>
              a written statement by you that you have a good-faith belief that
              the disputed use is not authorized by the copyright owner, its
              agent, or the law
            </li>
          </ul>
        </Typography>

        <Typography className={classes.title} variant="h5">
          Your Feedback
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Although we do not claim ownership of User-Generated Content you post
          using this Site, the Feedback you provide to us through this Site will
          be and remain our exclusive property. Your submission of Feedback will
          constitute an assignment to us of all worldwide rights, title and
          interests in your Feedback, including all copyrights and other
          intellectual property rights in your Feedback. We will be entitled to
          reduce to practice, exploit, make, use, copy, disclose, display or
          perform publicly, distribute, improve and modify any Feedback you
          submit for any purpose whatsoever, without restriction and without
          compensating you in any way. For this reason, we ask that you not send
          us any Feedback that you do not wish to assign to us.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Your obligation
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          In consideration of your use of this Site, you agree that to the
          extent you provide personal information to AreoLand it will be true,
          accurate, current, and complete and that you will update all personal
          information as necessary. You also agree that you will use an image of
          yourself that you are authorized to use for your profile picture. The
          use of company logos, advertisements, web addresses, contact
          information, pictures of celebrities or the unauthorized use of images
          owned by others is prohibited. Company logos may only be used on
          company profiles in our directory and may only be posted by authorized
          representatives of the respective company. To the extent you create an
          account through this Site, you understand and agree that any account
          you create, including your username and password, are personal to you
          and may not be used by anyone else. You are responsible for
          maintaining the confidentiality of your username and password and are
          fully responsible for all activities that occur under your username
          and password by you or by anyone else using your username and
          password, whether or not authorized by you. You agree to change your
          password immediately if you believe your password may have been
          compromised or used without authorization. You also agree to
          immediately inform us of any apparent breaches of security such as
          loss, theft or unauthorized disclosure or use of your username or
          password by contacting us using the information provided here: Until
          we are so notified you will remain liable for any unauthorized use of
          your account. You agree to use this Site in a manner consistent with
          any and all applicable rules and regulations. You agree not to upload
          or transmit through this Site any computer viruses, trojan horses,
          worms or anything else designed to interfere with, interrupt or
          disrupt the normal operating procedures of a computer. Any
          unauthorized modification, tampering or change of any information; any
          interference with the availability of or access to this Site; or any
          unauthorized scraping of the Content on this Site is strictly
          prohibited. We reserve all rights and remedies available to us,
          including but not limited to the right to terminate your access to
          this Site.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Fees and Payments
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          AreoLand members can elect to upgrade their account. Where they are
          charged a subscription fee for the use of certain services. AreoLand
          reserves the right to change the fees at any time, upon notice to
          you.. For any upgrade or downgrade in plan level, the credit card that
          you provided will automatically be charged the new rate immediately.
          All fees are paid in advance and are non-refundable. There will be no
          refunds or credits for partial months of service, upgrade/downgrade
          refunds, refunds for accounts that have had access to particular
          services restricted, refunds for accounts that have had upgrades
          canceled for any reason including violations of these Terms, or
          refunds for months unused. However, if a user upgrades and cancels
          within 24 hours without using the upgraded services offered to members
          with a paid subscription, we will offer a full refund minus any
          applicable cancellation fees. We reserve the right to deactivate your
          access to the Services for your failure to pay applicable fees or for
          violations of these Terms. If you provide us with a credit card that
          expires during the term of these Terms of Service, we reserve the
          right to charge any renewal card issued to you as a replacement. You
          agree to promptly pay AreoLand in the event of any refusal of your
          credit card issuer to pay any amount to AreoLand for any reason. You
          agree to pay all costs of collection, including attorneys’ fees and
          costs, on any outstanding balance. In the event you fail to pay any
          amount when due, AreoLand may immediately suspend or terminate your
          access to any or all of our services.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Automatic Renewal
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Your subscription will renew automatically, unless you cancel your
          subscription (see Cancellation on how to cancel). You must cancel your
          subscription before the calendar day it renews (the day of the month
          you are to be charged) to avoid billing of the subscription fees for
          the renewal term to your credit card. Additionally, we may terminate
          your subscription for a violation of these Terms.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Promotional or trial period pricing
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          We may elect to offer free or discounted pricing for use of the site/
          services or other subscription services (a "Trial"). After trial
          period you will not be charged until you upgrade your account. We do
          not collect any kind of Credit card or payment info in trial period.
          You agree to comply with any additional terms, restrictions or
          limitations we impose in connection with any Trial. You may not
          sign-up for multiple Accounts in order to receive additional benefits
          under any Trial.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Cancellation
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Go to the account setting page and click on cancel account. If you
          cancel the services you can use until you paid month end. But you will
          be not charged.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Disclaimers
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          We make no representations or warranties with respect to this site or
          its content, or any product or service available on or promoted
          through this site. This site and all of its content (including
          user-generated content) are provided on an “as is,” “as available”
          basis, without representations or warranties of any kind. To the
          fullest extent permitted by law, AreoLand, its affiliates, and their
          service providers and licensors disclaim any and all representations
          and warranties, whether express, implied, arising by statute, custom,
          course of dealing, course of performance or in any other way, with
          respect to this site, its content, and any products or services
          available or promoted through this site. Without limiting the
          generality of the foregoing, AreoLand, its affiliates, and their
          service providers and licensors disclaim all representations and
          warranties (a) of title, non-infringement, merchantability and fitness
          for a particular purpose; (b) relating to the security of this site;
          (c) that the content of this site is accurate, complete or current; or
          (d) that this site will operate securely or without interruption or
          error. We do not represent or warrant that this site, its servers, or
          any transmissions sent from us or through this site will be free of
          any harmful components (including viruses). AreoLand does not endorse
          and is not responsible for statements, advice and opinions made by
          anyone other than authorized AreoLand spokespersons. We do not endorse
          and are not responsible for any statements, advice or opinions
          contained in user-generated content and such statements, advice and
          opinions do not in any way reflect the statements, advice and opinions
          of AreoLand. We do not make any representations or warranties against
          the possibility of deletion, misdelivery or failure to store
          communications, personalized settings, or other data. You accept that
          our shareholders, owners, officers, directors, employees and other
          representatives shall have the benefit of this clause. Applicable law
          may not allow the limitation of certain warranties, so all or part of
          this disclaimer of warranties may not apply to you.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Links to third party websites
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          This Site may provide links to other websites operated by third
          parties. Because we have no control over third-party websites, we are
          not responsible for the availability of those websites and do not
          endorse and are not responsible or liable for any content,
          advertising, services, products, or other materials on or available
          from such websites. AreoLand shall not be responsible or liable,
          directly or indirectly, for any damage or loss caused or alleged to be
          caused by or in connection with the use of or reliance on any content,
          advertising, services, products, or other materials on or available
          from such websites. These Terms of Use do not apply to your use of
          third-party websites; your use of such websites is subject to the
          terms and policies of the owner of such websites. AreoLand has
          financial relationships with some of the companies, products, and
          services mentioned on our site, and may be compensated if users choose
          to follow the links pointing to those companies, products or services.
        </Typography>

        <Typography className={classes.title} variant="h5">
          These terms of use may change
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          These Terms of Use are current as of the effective date set forth
          above. AreoLand reserves the right to change these Terms of Use from
          time to time consistent with applicable laws and principles. These
          changes will be effective as of the date we post the revised version
          on this Site. Your continued use of this Site after we have posted the
          revised Terms of Use constitutes your agreement to be bound by the
          revised Terms of Use. If at any time you choose not to accept these
          Terms of Use, you should not use this Site.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Question
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          If you have any query please contact to our support. <br />
          Email: support@areoland.com
        </Typography>
      </div>
    </Minimal>
  );
};

export default TermsAndConditions;
