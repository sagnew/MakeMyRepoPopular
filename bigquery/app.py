from bigquery import get_client

project_id = 'rational-terra-92506'

service_account = '987269487429-401mrm39pk35icj18om02c9pd1slqdg9@developer.gserviceaccount.com'

with open("makemyrepopopular-864d148e1085.p12") as f: 
    private_key = f.read()

client = get_client(project_id, service_account=service_account, private_key=private_key, readonly=True)

job_id, _results = client.query('SELECT * FROM [githubarchive:year.2012] WHERE repository_name = "node" LIMIT 1000')

complete, row_count = client.check_job(job_id)

if complete:
    results = client.get_query_rows(job_id)
    print results

