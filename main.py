import requests

apikey = "NuCoBWbEEIkwHpEd7NJOF7QX2SIKWq%2BNPoySH8zx5F5hjX1S124KO2zRw845bN%2F%2FwNf%2FNugWmZzjSjgYJbA5xA%3D%3D"
base_url = "http://kosis.kr/kosisapi/service/SubwayInfoService/"
service_url = {
    "searchByName" : "getKwrdFndSubwaySttnList"
}
params = {
    "ServiceKey" : apikey,
    "STAT_JIPYO_NM" : "%EA%B0%95%EC%88%98%EB%9F%89"
}

document = requests.get("http://kosis.kr/kosisapi/service/IndicatorService/IndListSearchRequest" , params=params).content
print(document)