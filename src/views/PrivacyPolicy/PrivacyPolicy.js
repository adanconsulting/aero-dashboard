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

const PrivacyPolicy = (props) => {
  const classes = useStyles();

  return (
    <Minimal>
      <div className={classes.root}>
        <Typography className={classes.title} variant="h3">
          Privacy Policy
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          AreoLand respects and is committed to protecting your privacy. The
          privacy policy applies to our website and mobile apps.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Registration
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          In order to license products or Memberships from AreoLand (Website),
          you (Member) must first complete the registration form. The
          information collected includes name, email address, phone number and
          credit card number. This information is used for the sole purpose of
          providing products and services which you have purchased and follow-up
          support for those products. Registration is transmitted over the
          Internet using SSL, the most powerful encryption available for
          commercial transactions today.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Member Private Information
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Our Members use AreoLand software and services to organize and store
          information (such as property addresses, fees paid/received, photos
          and documents) that they consider personal and private (Member Private
          Information). We respect our Members privacy and consider this
          information to be for the exclusive use of our Members. It is never
          shared or used by AreoLand unless explicit permission is granted by
          our Member.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Sharing of Information
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          We will not sell, share, or rent the information collected or stored
          within the Website.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Advertising
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          <ul>
            <li>We do not serve pop-up or pop-under advertising</li>
            <li>
              {" "}
              We do not offer services that install hidden, ad-supported
              programs onto users' computers
            </li>
            <li>
              We do not work with companies who engage in advertising through
              spyware, hidden ad-supported downloads or similar activities
            </li>
          </ul>
          We only let you know if we have any other services. So you can benefit
          from them also.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Email & Phone
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          AreoLand may periodically call you and send you emails regarding
          changes to the Site, the status of your membership, or as part of the
          sales & support process. AreoLand does not make available your Email
          address or phone number to third parties, except as required to
          complete a transaction.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Your Ability to Edit and Delete Your Account Information and
          Preferences
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          All personally identifiable information AreoLand collects on a Member
          is available for viewing and editing by our Member by accessing their
          profile. You can edit or delete your Account Information at any time
          from our website by signing in and changing your profile.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Camera and Photos.
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Many of our services require us to collect images and other
          information from your device's camera and photos. For example, you
          won't be able to take or upload photos from your camera roll unless we
          can access your camera or photos.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Location Information.
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          When you use our services we may collect information about your
          location. With your consent, we may also collect information about
          your precise location using methods that include GPS, wireless
          networks, cell towers, Wi-Fi access points, and other sensors, such as
          gyroscopes, accelerometers, and compasses.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Links
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          This website contains links to other sites. AreoLand is not
          responsible for the privacy practices other sites. All external links,
          when clicked on, will open a fresh window making clear that a new site
          is being accessed.
        </Typography>

        <Typography className={classes.title} variant="h5">
          Changes to this Privacy Policy
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          AreoLand may update this policy. If it does, it will post changes on
          its website.
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

export default PrivacyPolicy;
