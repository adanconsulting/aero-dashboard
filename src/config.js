const config = {
  dev: {
    paypal_client_id:
      "AdCp_WGX_yBIDVehBZDOqzAMCDnTQHu-0lMHmXdATw3qW8Jij4pLi5P-WjAJhF9G-DO7sGJ_1IobebeY",
    paypal_plan_id: "P-2Y8016708H6349046MBIK24Y",
  },
  prod: {
    paypal_client_id:
      "AboP5YQA2LbD9a2jyqos_cnlx0DBymIPTGPu_bzreRQGests_Q2zwXnKZbNsqgfVxx2IAlBbD2RJa0QM",
    paypal_plan_id: "P-6VC82047KW9615813MBIKOXI",
  },
};

export let paypalClientId;
export let paypalPlanId;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  paypalClientId = config.dev.paypal_client_id;
  paypalPlanId = config.dev.paypal_plan_id;
} else {
  paypalClientId = config.prod.paypal_client_id;
  paypalPlanId = config.prod.paypal_plan_id;
}
